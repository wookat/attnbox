import { describe, expect, it } from "vitest";
import { DevinCollector, mapStatus } from "./devin.js";

function fakeFetch(body: unknown, ok = true): typeof fetch {
  return (async () =>
    ({
      ok,
      json: async () => body
    }) as Response) as typeof fetch;
}

describe("DevinCollector", () => {
  it("maps blocked sessions to waiting/answer with authoritative confidence", async () => {
    const collector = new DevinCollector(
      "key",
      "https://api.devin.ai/v1",
      fakeFetch({
        sessions: [
          {
            session_id: "devin-abc",
            title: "Fix CI",
            status_enum: "blocked",
            updated_at: "2026-08-04T00:00:00Z",
            pull_request: { url: "https://github.com/o/r/pull/1" }
          }
        ]
      })
    );
    const items = await collector.collect();
    expect(items[0]).toMatchObject({
      id: "devin:devin-abc",
      agent: "devin",
      location: "cloud",
      status: "waiting",
      attention: "answer",
      confidence: "authoritative",
      url: "https://github.com/o/r/pull/1"
    });
  });

  it("falls back to the session URL when there is no PR", async () => {
    const collector = new DevinCollector(
      "key",
      "https://api.devin.ai/v1",
      fakeFetch({ sessions: [{ session_id: "devin-abc", status_enum: "working" }] })
    );
    const items = await collector.collect();
    expect(items[0]?.url).toBe("https://app.devin.ai/sessions/abc");
    expect(items[0]?.status).toBe("working");
  });

  it("returns empty on HTTP errors and network failures", async () => {
    expect(await new DevinCollector("k", "u", fakeFetch({}, false)).collect()).toEqual([]);
    const throwing = (async () => {
      throw new Error("network");
    }) as unknown as typeof fetch;
    expect(await new DevinCollector("k", "u", throwing).collect()).toEqual([]);
  });
});

describe("mapStatus", () => {
  it("maps the documented enum values", () => {
    expect(mapStatus("blocked")).toBe("waiting");
    expect(mapStatus("working")).toBe("working");
    expect(mapStatus("finished")).toBe("done");
    expect(mapStatus("resumed")).toBe("idle");
    expect(mapStatus(undefined)).toBe("unknown");
  });
});
