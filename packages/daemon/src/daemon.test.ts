import { afterEach, describe, expect, it } from "vitest";
import type { AttentionItem, Collector } from "attnbox-core";
import { createDaemon, listen, type Daemon } from "./index.js";

function stubCollector(items: AttentionItem[]): Collector {
  return { name: "stub", collect: async () => items };
}

const waitingItem: AttentionItem = {
  id: "demo:1",
  agent: "demo",
  location: "local",
  status: "waiting",
  attention: "approve",
  confidence: "heuristic",
  title: "Approve rm -rf?"
};

let daemon: Daemon | undefined;
afterEach(async () => {
  await daemon?.close();
  daemon = undefined;
});

describe("daemon", () => {
  it("serves collected items over /api/items", async () => {
    daemon = createDaemon({ collectors: [stubCollector([waitingItem])], intervalMs: 60_000 });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const res = await fetch(`http://127.0.0.1:${port}/api/items`);
    const body = (await res.json()) as { items: AttentionItem[]; summary: { waiting: number } };
    expect(res.status).toBe(200);
    expect(body.items).toHaveLength(1);
    expect(body.items[0]?.id).toBe("demo:1");
    expect(body.summary.waiting).toBe(1);
  });

  it("streams a snapshot immediately over SSE", async () => {
    daemon = createDaemon({ collectors: [stubCollector([waitingItem])], intervalMs: 60_000 });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const res = await fetch(`http://127.0.0.1:${port}/api/events`);
    expect(res.headers.get("content-type")).toContain("text/event-stream");
    const reader = res.body!.getReader();
    const { value } = await reader.read();
    const text = new TextDecoder().decode(value);
    expect(text).toContain('"demo:1"');
    await reader.cancel();
  });

  it("survives a collector that throws", async () => {
    const throwing: Collector = {
      name: "boom",
      collect: async () => {
        throw new Error("boom");
      }
    };
    daemon = createDaemon({ collectors: [throwing, stubCollector([waitingItem])], intervalMs: 60_000 });
    await daemon.ready;
    expect(daemon.items()).toHaveLength(1);
  });

  it("forwards /api/reply to the configured handler", async () => {
    const calls: [string, string][] = [];
    daemon = createDaemon({
      collectors: [stubCollector([waitingItem])],
      intervalMs: 60_000,
      reply: async (id, message) => {
        calls.push([id, message]);
        return { ok: true, status: 200 };
      }
    });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const res = await fetch(`http://127.0.0.1:${port}/api/reply`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: "devin:abc", message: "go ahead" })
    });
    expect(res.status).toBe(200);
    expect(calls).toEqual([["devin:abc", "go ahead"]]);
  });

  it("rejects bad /api/reply requests without calling the handler", async () => {
    let called = 0;
    daemon = createDaemon({
      collectors: [],
      intervalMs: 60_000,
      reply: async () => {
        called += 1;
        return { ok: true };
      }
    });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const bad = await fetch(`http://127.0.0.1:${port}/api/reply`, {
      method: "POST",
      body: JSON.stringify({ id: 1 })
    });
    expect(bad.status).toBe(400);
    const invalid = await fetch(`http://127.0.0.1:${port}/api/reply`, { method: "POST", body: "{" });
    expect(invalid.status).toBe(400);
    expect(called).toBe(0);
  });

  it("returns 501 from /api/reply when no handler is configured", async () => {
    daemon = createDaemon({ collectors: [], intervalMs: 60_000 });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const res = await fetch(`http://127.0.0.1:${port}/api/reply`, {
      method: "POST",
      body: JSON.stringify({ id: "devin:abc", message: "hi" })
    });
    expect(res.status).toBe(501);
  });

  it("serves a fallback page when no web UI is built", async () => {
    daemon = createDaemon({ collectors: [], intervalMs: 60_000 });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const res = await fetch(`http://127.0.0.1:${port}/`);
    expect(await res.text()).toContain("attnbox");
  });
});
