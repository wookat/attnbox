import { describe, expect, it } from "vitest";
import { capStaleWorking, sortItems, summarize, WORKING_STALE_MS, type AttentionItem } from "./index.js";

function item(partial: Partial<AttentionItem> & Pick<AttentionItem, "id" | "status">): AttentionItem {
  return {
    agent: "demo",
    location: "local",
    confidence: "heuristic",
    title: partial.id,
    ...partial
  };
}

describe("sortItems", () => {
  it("puts waiting before working before idle", () => {
    const sorted = sortItems([
      item({ id: "a", status: "idle" }),
      item({ id: "b", status: "working" }),
      item({ id: "c", status: "waiting" })
    ]);
    expect(sorted.map((i) => i.id)).toEqual(["c", "b", "a"]);
  });

  it("breaks ties by most recent activity", () => {
    const sorted = sortItems([
      item({ id: "old", status: "waiting", lastActivityAt: "2026-08-01T00:00:00Z" }),
      item({ id: "new", status: "waiting", lastActivityAt: "2026-08-04T00:00:00Z" })
    ]);
    expect(sorted.map((i) => i.id)).toEqual(["new", "old"]);
  });

  it("does not mutate its input", () => {
    const input = [item({ id: "a", status: "idle" }), item({ id: "b", status: "waiting" })];
    sortItems(input);
    expect(input[0]?.id).toBe("a");
  });
});

describe("summarize", () => {
  it("counts waiting and working", () => {
    const s = summarize([
      item({ id: "a", status: "waiting" }),
      item({ id: "b", status: "working" }),
      item({ id: "c", status: "idle" })
    ]);
    expect(s).toEqual({ total: 3, waiting: 1, working: 1 });
  });
});

describe("capStaleWorking", () => {
  const now = new Date("2026-08-04T12:00:00Z");

  it("caps a stale working session to idle", () => {
    const stale = item({
      id: "a",
      status: "working",
      lastActivityAt: new Date(now.getTime() - WORKING_STALE_MS - 1000).toISOString()
    });
    expect(capStaleWorking(stale, now).status).toBe("idle");
  });

  it("keeps a fresh working session", () => {
    const fresh = item({ id: "a", status: "working", lastActivityAt: now.toISOString() });
    expect(capStaleWorking(fresh, now).status).toBe("working");
  });

  it("leaves waiting sessions alone regardless of age", () => {
    const waiting = item({ id: "a", status: "waiting", lastActivityAt: "2026-01-01T00:00:00Z" });
    expect(capStaleWorking(waiting, now).status).toBe("waiting");
  });
});
