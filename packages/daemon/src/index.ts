import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, extname, join, normalize } from "node:path";
import { constants, createGzip, gzipSync } from "node:zlib";
import { sortItems, summarize, type AttentionItem, type Collector } from "attnbox-core";

export interface ReplyResult {
  ok: boolean;
  status?: number;
  error?: string;
}

export interface DaemonOptions {
  collectors: Collector[];
  /** Poll interval in ms. */
  intervalMs?: number;
  /** Directory of the built web UI; served at `/` when present. */
  webDist?: string;
  /** Optional act-in-place handler: send a reply to the agent behind an item. */
  reply?: (itemId: string, message: string) => Promise<ReplyResult>;
  /** File persisting handled/ack state across browsers and devices. */
  ackFile?: string;
  /** When set, every /api/* request must present this token (Bearer header or ?token= query). */
  token?: string;
  /** POSTed `{ event: "waiting", item }` each time an item newly enters waiting. Fire-and-forget, fail-soft. */
  webhookUrl?: string;
}

export interface Daemon {
  server: Server;
  /** Resolved once the first collection pass completes. */
  ready: Promise<void>;
  items(): AttentionItem[];
  refresh(): Promise<AttentionItem[]>;
  close(): Promise<void>;
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

/** Localhost-only attention inbox daemon: JSON API + SSE + static web UI. */
export function createDaemon(options: DaemonOptions): Daemon {
  const intervalMs = options.intervalMs ?? 3000;
  let snapshot: AttentionItem[] = [];
  const sseClients = new Set<SseClient>();
  const ackFile = options.ackFile ?? join(homedir(), ".attnbox", "acked.json");
  const acked: Record<string, string> = readAcked(ackFile);

  function setAck(id: string, at: string | null): void {
    if (at === null) delete acked[id];
    else acked[id] = at;
    try {
      mkdirSync(dirname(ackFile), { recursive: true });
      writeFileSync(ackFile, JSON.stringify(acked));
    } catch {
      // persistence is best-effort; in-memory state still serves this run
    }
    broadcast();
  }

  let waitingSeen: Set<string> | undefined;

  function fireWebhooks(next: AttentionItem[]): void {
    const nowWaiting = new Set(next.filter((i) => i.status === "waiting").map((i) => i.id));
    // the first pass only records state — items already waiting at startup are not "new"
    if (options.webhookUrl !== undefined && waitingSeen !== undefined) {
      for (const item of next) {
        if (item.status === "waiting" && !waitingSeen.has(item.id)) {
          void fetch(options.webhookUrl, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ event: "waiting", item }),
            signal: AbortSignal.timeout(5000)
          }).catch(() => undefined);
        }
      }
    }
    waitingSeen = nowWaiting;
  }

  async function refresh(): Promise<AttentionItem[]> {
    const results = await Promise.all(
      options.collectors.map(async (c) => {
        try {
          return await c.collect();
        } catch {
          return [];
        }
      })
    );
    const next = sortItems(results.flat());
    fireWebhooks(next);
    const changed = JSON.stringify(next) !== JSON.stringify(snapshot);
    snapshot = next;
    if (changed) broadcast();
    return snapshot;
  }

  function payloadJson(): string {
    return JSON.stringify({ items: snapshot, summary: summarize(snapshot), acked });
  }

  function broadcast(): void {
    const payload = `data: ${payloadJson()}\n\n`;
    for (const client of sseClients) client.write(payload);
  }

  function handle(req: IncomingMessage, res: ServerResponse): void {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (options.token && url.pathname.startsWith("/api/")) {
      const presented =
        req.headers.authorization === `Bearer ${options.token}` || url.searchParams.get("token") === options.token;
      if (!presented) {
        res.writeHead(401, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ ok: false, error: "missing or invalid token" }));
        return;
      }
    }
    if (url.pathname === "/api/reply" && req.method === "POST") {
      void handleReply(req, res);
      return;
    }
    if (url.pathname === "/api/ack" && req.method === "POST") {
      void handleAck(req, res);
      return;
    }
    const acceptsGzip = /\bgzip\b/.test(String(req.headers["accept-encoding"] ?? ""));
    if (url.pathname === "/api/items") {
      const body = payloadJson();
      if (acceptsGzip) {
        res.writeHead(200, { "content-type": "application/json; charset=utf-8", "content-encoding": "gzip" });
        res.end(gzipSync(body));
      } else {
        res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
        res.end(body);
      }
      return;
    }
    if (url.pathname === "/api/events") {
      res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        connection: "keep-alive",
        ...(acceptsGzip ? { "content-encoding": "gzip" } : {})
      });
      let client: SseClient;
      if (acceptsGzip) {
        // snapshots are large and repetitive; a per-connection gzip stream with a sync
        // flush per event cuts the wire cost ~10x while EventSource decodes transparently
        const gz = createGzip({ flush: constants.Z_SYNC_FLUSH });
        gz.pipe(res);
        client = { write: (chunk) => void gz.write(chunk), end: () => gz.end() };
      } else {
        client = { write: (chunk) => void res.write(chunk), end: () => res.end() };
      }
      client.write(`data: ${payloadJson()}\n\n`);
      sseClients.add(client);
      req.on("close", () => sseClients.delete(client));
      return;
    }
    serveStatic(url.pathname, res, options.webDist);
  }

  async function handleAck(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const json = (code: number, body: unknown): void => {
      res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(body));
    };
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    if (Buffer.concat(chunks).length > 65536) {
      json(413, { ok: false, error: "body too large" });
      return;
    }
    let body: { id?: unknown; at?: unknown };
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as typeof body;
    } catch {
      json(400, { ok: false, error: "invalid JSON" });
      return;
    }
    if (typeof body.id !== "string" || (typeof body.at !== "string" && body.at !== null)) {
      json(400, { ok: false, error: "expected { id: string, at: string | null }" });
      return;
    }
    if (body.at !== null && Number.isNaN(Date.parse(body.at))) {
      json(400, { ok: false, error: "at must be an ISO timestamp or null" });
      return;
    }
    if (body.at !== null && !snapshot.some((item) => item.id === body.id)) {
      json(404, { ok: false, error: "unknown item id" });
      return;
    }
    setAck(body.id, body.at);
    json(200, { ok: true, acked });
  }

  async function handleReply(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const json = (code: number, body: unknown): void => {
      res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(body));
    };
    if (!options.reply) {
      json(501, { ok: false, error: "no reply handler configured" });
      return;
    }
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    if (Buffer.concat(chunks).length > 65536) {
      json(413, { ok: false, error: "message too large" });
      return;
    }
    let body: { id?: unknown; message?: unknown };
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as typeof body;
    } catch {
      json(400, { ok: false, error: "invalid JSON" });
      return;
    }
    if (typeof body.id !== "string" || typeof body.message !== "string" || body.message.trim() === "") {
      json(400, { ok: false, error: "expected { id: string, message: string }" });
      return;
    }
    const result = await options.reply(body.id, body.message);
    json(result.ok ? 200 : 502, result);
    if (result.ok) void refresh();
  }

  const server = createServer(handle);
  const timer = setInterval(() => void refresh(), intervalMs);
  timer.unref();
  const ready = refresh().then(() => undefined);

  return {
    server,
    ready,
    items: () => snapshot,
    refresh,
    close: async () => {
      clearInterval(timer);
      for (const client of sseClients) client.end();
      if (!server.listening) return;
      await new Promise<void>((resolve, reject) =>
        server.close((err) => (err ? reject(err) : resolve()))
      );
    }
  };
}

interface SseClient {
  write(chunk: string): void;
  end(): void;
}

function readAcked(path: string): Record<string, string> {
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8")) as unknown;
    if (typeof parsed !== "object" || parsed === null) return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed)) if (typeof v === "string") out[k] = v;
    return out;
  } catch {
    return {};
  }
}

function serveStatic(pathname: string, res: ServerResponse, webDist: string | undefined): void {
  if (!webDist) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end("<!doctype html><title>attnbox</title><p>attnbox daemon is running. Web UI not built; use /api/items.</p>");
    return;
  }
  const rel = pathname === "/" ? "index.html" : pathname.slice(1);
  const path = normalize(join(webDist, rel));
  if (!path.startsWith(normalize(webDist)) || !existsSync(path)) {
    // SPA fallback
    const index = join(webDist, "index.html");
    if (existsSync(index)) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" });
      res.end(readFileSync(index));
    } else {
      res.writeHead(404);
      res.end("not found");
    }
    return;
  }
  res.writeHead(200, {
    "content-type": MIME[extname(path)] ?? "application/octet-stream",
    // Vite content-hashes everything under /assets/; the rest (index.html, sw.js, manifest) must revalidate.
    "cache-control": rel.startsWith("assets/") ? "public, max-age=31536000, immutable" : "no-cache"
  });
  res.end(readFileSync(path));
}

export function listen(daemon: Daemon, port: number, host = "127.0.0.1"): Promise<number> {
  return new Promise((resolve, reject) => {
    daemon.server.once("error", reject);
    daemon.server.listen(port, host, () => {
      const address = daemon.server.address();
      resolve(typeof address === "object" && address !== null ? address.port : port);
    });
  });
}
