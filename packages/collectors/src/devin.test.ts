import { describe, expect, it } from "vitest";
import { DevinCollector, MAX_DETAIL_FETCHES_PER_CYCLE, mapStatus, projectFromPrUrl, sendDevinMessage } from "./devin.js";

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
      url: "https://app.devin.ai/sessions/abc",
      prUrl: "https://github.com/o/r/pull/1",
      project: "o/r"
    });
  });

  it("links non-waiting sessions to their PR when one exists", async () => {
    const collector = new DevinCollector(
      "key",
      "https://api.devin.ai/v1",
      fakeFetch({
        sessions: [
          { session_id: "devin-abc", status_enum: "working", pull_request: { url: "https://github.com/o/r/pull/1" } }
        ]
      })
    );
    const items = await collector.collect();
    expect(items[0]?.url).toBe("https://github.com/o/r/pull/1");
    // the PR is already the primary link, so no separate secondary link
    expect(items[0]?.prUrl).toBeUndefined();
  });

  it("paginates past the first 100 sessions until a short page", async () => {
    const requested: string[] = [];
    const paged = (async (url: RequestInfo | URL) => {
      const u = String(url);
      requested.push(u);
      const offset = Number(new URL(u).searchParams.get("offset"));
      const count = offset === 0 ? 100 : 3;
      return {
        ok: true,
        json: async () => ({
          sessions: Array.from({ length: count }, (_, i) => ({
            session_id: `devin-${offset + i}`,
            status_enum: offset === 0 && i === 0 ? "working" : offset > 0 && i === 0 ? "blocked" : "finished"
          }))
        })
      } as Response;
    }) as typeof fetch;
    const collector = new DevinCollector("key", "https://api.devin.ai/v1", paged);
    const items = await collector.collect();
    expect(items).toHaveLength(103);
    // deep pages beyond the first short one are discarded even though they were prefetched
    expect(items.filter((i) => i.id === "devin:devin-200")).toHaveLength(0);
    // the waiting session that lives beyond page 1 is not silently dropped
    expect(items.find((i) => i.id === "devin:devin-100")?.status).toBe("waiting");
  });

  it("reuses the deep-page crawl within the refresh window", async () => {
    const listCalls: string[] = [];
    const paged = (async (url: RequestInfo | URL) => {
      const u = String(url);
      if (u.includes("/sessions?")) listCalls.push(u);
      const offset = Number(new URL(u).searchParams.get("offset"));
      const count = offset === 0 ? 100 : 1;
      return {
        ok: true,
        json: async () => ({
          sessions: Array.from({ length: count }, (_, i) => ({
            session_id: `devin-${offset + i}`,
            status_enum: "finished"
          }))
        })
      } as Response;
    }) as typeof fetch;
    const collector = new DevinCollector("key", "https://api.devin.ai/v1", paged);
    expect(await collector.collect()).toHaveLength(101);
    const afterFirst = listCalls.length;
    expect(await collector.collect()).toHaveLength(101);
    // second cycle only re-fetched page 1; the deep crawl was served from cache
    expect(listCalls.length).toBe(afterFirst + 1);
  });

  it("keeps already-fetched pages when a later page fails", async () => {
    let call = 0;
    const flaky = (async () => {
      call++;
      if (call === 2) throw new Error("network");
      return {
        ok: true,
        json: async () => ({
          sessions: Array.from({ length: 100 }, (_, i) => ({ session_id: `devin-${i}`, status_enum: "finished" }))
        })
      } as Response;
    }) as typeof fetch;
    const collector = new DevinCollector("key", "https://api.devin.ai/v1", flaky);
    const items = await collector.collect();
    expect(items).toHaveLength(100);
  });

  it("attaches what the agent is asking to waiting items, cached by updated_at", async () => {
    const calls: string[] = [];
    const routed = (async (url: RequestInfo | URL) => {
      const u = String(url);
      calls.push(u);
      if (u.includes("/sessions")) {
        return {
          ok: true,
          json: async () => ({
            sessions: [
              { session_id: "devin-a", status_enum: "blocked", updated_at: "t1" },
              { session_id: "devin-b", status_enum: "working", updated_at: "t1" }
            ]
          })
        } as Response;
      }
      return {
        ok: true,
        json: async () => ({
          messages: [
            { type: "user_message", message: "go" },
            { type: "devin_message", message: "  Should I  merge\nthe PR? " }
          ]
        })
      } as Response;
    }) as typeof fetch;
    const collector = new DevinCollector("key", "https://api.devin.ai/v1", routed);

    const first = await collector.collect();
    expect(first[0]?.detail).toBe("Should I merge the PR?");
    expect(first[1]?.detail).toBeUndefined();
    expect(calls.filter((c) => c.includes("/session/devin-a")).length).toBe(1);

    const second = await collector.collect();
    expect(second[0]?.detail).toBe("Should I merge the PR?");
    expect(calls.filter((c) => c.includes("/session/devin-a")).length).toBe(1);
  });

  it("caps uncached detail fetches per cycle and catches up next cycle", async () => {
    const sessions = Array.from({ length: 15 }, (_, i) => ({
      session_id: `devin-${i}`,
      status_enum: "blocked",
      updated_at: "t1"
    }));
    let detailCalls = 0;
    const routed = (async (url: RequestInfo | URL) => {
      if (String(url).includes("/sessions")) {
        return { ok: true, json: async () => ({ sessions }) } as Response;
      }
      detailCalls++;
      return {
        ok: true,
        json: async () => ({ messages: [{ type: "devin_message", message: "q" }] })
      } as Response;
    }) as typeof fetch;
    const collector = new DevinCollector("key", "https://api.devin.ai/v1", routed);

    const first = await collector.collect();
    expect(detailCalls).toBe(MAX_DETAIL_FETCHES_PER_CYCLE);
    expect(first.filter((i) => i.detail).length).toBe(MAX_DETAIL_FETCHES_PER_CYCLE);

    const second = await collector.collect();
    expect(detailCalls).toBe(15);
    expect(second.filter((i) => i.detail).length).toBe(15);
  });

  it("degrades silently when the detail fetch fails", async () => {
    const routed = (async (url: RequestInfo | URL) => {
      if (String(url).includes("/sessions")) {
        return {
          ok: true,
          json: async () => ({ sessions: [{ session_id: "devin-a", status_enum: "blocked", updated_at: "t1" }] })
        } as Response;
      }
      throw new Error("network");
    }) as typeof fetch;
    const items = await new DevinCollector("key", "https://api.devin.ai/v1", routed).collect();
    expect(items[0]?.status).toBe("waiting");
    expect(items[0]?.detail).toBeUndefined();
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

  it("falls back to the coarse status field when status_enum is null", async () => {
    const collector = new DevinCollector(
      "key",
      "https://api.devin.ai/v1",
      fakeFetch({ sessions: [{ session_id: "devin-abc", status_enum: null, status: "running" }] })
    );
    const items = await collector.collect();
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

describe("sendDevinMessage", () => {
  it("posts the message to the session endpoint", async () => {
    const calls: [string, RequestInit | undefined][] = [];
    const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push([String(url), init]);
      return { ok: true, status: 200 } as Response;
    }) as typeof fetch;
    const result = await sendDevinMessage("key", "devin-abc", "go ahead", "https://api.devin.ai/v1", fetchImpl);
    expect(result).toEqual({ ok: true, status: 200 });
    expect(calls[0]?.[0]).toBe("https://api.devin.ai/v1/session/devin-abc/message");
    expect(JSON.parse(String(calls[0]?.[1]?.body))).toEqual({ message: "go ahead" });
  });

  it("refuses invalid session ids and empty messages without calling the API", async () => {
    let called = 0;
    const fetchImpl = (async () => {
      called += 1;
      return { ok: true, status: 200 } as Response;
    }) as typeof fetch;
    expect((await sendDevinMessage("k", "../etc", "hi", undefined, fetchImpl)).ok).toBe(false);
    expect((await sendDevinMessage("k", "devin-abc", "  ", undefined, fetchImpl)).ok).toBe(false);
    expect(called).toBe(0);
  });

  it("reports HTTP and network failures", async () => {
    const bad = (async () => ({ ok: false, status: 401 }) as Response) as typeof fetch;
    expect(await sendDevinMessage("k", "devin-abc", "hi", undefined, bad)).toEqual({
      ok: false,
      status: 401,
      error: "HTTP 401"
    });
    const down = (async () => {
      throw new Error("network");
    }) as unknown as typeof fetch;
    expect((await sendDevinMessage("k", "devin-abc", "hi", undefined, down)).error).toBe("network error");
  });
});

describe("projectFromPrUrl", () => {
  it("derives owner/repo from a GitHub PR url", () => {
    expect(projectFromPrUrl("https://github.com/wookat/attnbox/pull/64")).toBe("wookat/attnbox");
  });

  it("derives the project from a GitLab merge request url", () => {
    expect(projectFromPrUrl("https://gitlab.com/grp/proj/merge_requests/2")).toBe("grp/proj");
  });

  it("returns undefined without a pull request", () => {
    expect(projectFromPrUrl(undefined)).toBeUndefined();
    expect(projectFromPrUrl("https://app.devin.ai/sessions/abc")).toBeUndefined();
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
