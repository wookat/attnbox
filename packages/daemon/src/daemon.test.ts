import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
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

  it("persists ack state to disk and includes it in payloads", async () => {
    const ackFile = join(mkdtempSync(join(tmpdir(), "attnbox-ack-")), "acked.json");
    daemon = createDaemon({ collectors: [stubCollector([waitingItem])], intervalMs: 60_000, ackFile });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const set = await fetch(`http://127.0.0.1:${port}/api/ack`, {
      method: "POST",
      body: JSON.stringify({ id: "demo:1", at: "2026-08-05T00:00:00Z" })
    });
    expect(set.status).toBe(200);
    const items = (await (await fetch(`http://127.0.0.1:${port}/api/items`)).json()) as {
      acked: Record<string, string>;
    };
    expect(items.acked).toEqual({ "demo:1": "2026-08-05T00:00:00Z" });
    await daemon.close();

    // a fresh daemon reads the same file — state survives restarts and is shared across devices
    daemon = createDaemon({ collectors: [], intervalMs: 60_000, ackFile });
    await daemon.ready;
    const port2 = await listen(daemon, 0);
    const again = (await (await fetch(`http://127.0.0.1:${port2}/api/items`)).json()) as {
      acked: Record<string, string>;
    };
    expect(again.acked).toEqual({ "demo:1": "2026-08-05T00:00:00Z" });
    const unset = await fetch(`http://127.0.0.1:${port2}/api/ack`, {
      method: "POST",
      body: JSON.stringify({ id: "demo:1", at: null })
    });
    expect(unset.status).toBe(200);
    expect(((await (await fetch(`http://127.0.0.1:${port2}/api/items`)).json()) as { acked: object }).acked).toEqual({});
  });

  it("rejects malformed /api/ack input", async () => {
    const ackFile = join(mkdtempSync(join(tmpdir(), "attnbox-ack-")), "acked.json");
    daemon = createDaemon({ collectors: [], intervalMs: 60_000, ackFile });
    await daemon.ready;
    const port = await listen(daemon, 0);
    expect((await fetch(`http://127.0.0.1:${port}/api/ack`, { method: "POST", body: "{" })).status).toBe(400);
    expect(
      (await fetch(`http://127.0.0.1:${port}/api/ack`, { method: "POST", body: JSON.stringify({ id: 1, at: "x" }) }))
        .status
    ).toBe(400);
    expect(
      (
        await fetch(`http://127.0.0.1:${port}/api/ack`, {
          method: "POST",
          body: JSON.stringify({ id: "demo:1", at: "not-a-date" })
        })
      ).status
    ).toBe(400);
    expect(
      (
        await fetch(`http://127.0.0.1:${port}/api/ack`, {
          method: "POST",
          body: JSON.stringify({ id: "unknown:1", at: "2026-08-05T00:00:00Z" })
        })
      ).status
    ).toBe(404);
    expect(
      (
        await fetch(`http://127.0.0.1:${port}/api/ack`, {
          method: "POST",
          body: JSON.stringify({ id: "x".repeat(70000), at: "2026-08-05T00:00:00Z" })
        })
      ).status
    ).toBe(413);
  });

  it("gates /api/* behind the token when one is configured", async () => {
    const ackFile = join(mkdtempSync(join(tmpdir(), "attnbox-ack-")), "acked.json");
    daemon = createDaemon({ collectors: [stubCollector([waitingItem])], intervalMs: 60_000, ackFile, token: "s3cret" });
    await daemon.ready;
    const port = await listen(daemon, 0);
    expect((await fetch(`http://127.0.0.1:${port}/api/items`)).status).toBe(401);
    expect((await fetch(`http://127.0.0.1:${port}/api/items?token=wrong`)).status).toBe(401);
    expect((await fetch(`http://127.0.0.1:${port}/api/items?token=s3cret`)).status).toBe(200);
    expect(
      (await fetch(`http://127.0.0.1:${port}/api/items`, { headers: { authorization: "Bearer s3cret" } })).status
    ).toBe(200);
    const ack = await fetch(`http://127.0.0.1:${port}/api/ack?token=s3cret`, {
      method: "POST",
      body: JSON.stringify({ id: "demo:1", at: "2026-08-05T00:00:00Z" })
    });
    expect(ack.status).toBe(200);
    // static shell stays open — the token arrives via /?token= in the first place
    expect((await fetch(`http://127.0.0.1:${port}/`)).status).toBe(200);
  });

  it("serves hashed assets as immutable and everything else as no-cache", async () => {
    const webDist = mkdtempSync(join(tmpdir(), "attnbox-web-"));
    mkdirSync(join(webDist, "assets"));
    writeFileSync(join(webDist, "index.html"), "<!doctype html>attnbox");
    writeFileSync(join(webDist, "assets", "index-abc123.js"), "console.log(1)");
    daemon = createDaemon({ collectors: [], intervalMs: 60_000, webDist });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const asset = await fetch(`http://127.0.0.1:${port}/assets/index-abc123.js`);
    expect(asset.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
    const index = await fetch(`http://127.0.0.1:${port}/`);
    expect(index.headers.get("cache-control")).toBe("no-cache");
    const spa = await fetch(`http://127.0.0.1:${port}/some/route`);
    expect(spa.headers.get("cache-control")).toBe("no-cache");
  });

  it("serves a fallback page when no web UI is built", async () => {
    daemon = createDaemon({ collectors: [], intervalMs: 60_000 });
    await daemon.ready;
    const port = await listen(daemon, 0);
    const res = await fetch(`http://127.0.0.1:${port}/`);
    expect(await res.text()).toContain("attnbox");
  });
});
