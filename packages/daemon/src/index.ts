import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { sortItems, summarize, type AttentionItem, type Collector } from "attnbox-core";

export interface DaemonOptions {
  collectors: Collector[];
  /** Poll interval in ms. */
  intervalMs?: number;
  /** Directory of the built web UI; served at `/` when present. */
  webDist?: string;
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
  ".json": "application/json; charset=utf-8"
};

/** Localhost-only attention inbox daemon: JSON API + SSE + static web UI. */
export function createDaemon(options: DaemonOptions): Daemon {
  const intervalMs = options.intervalMs ?? 3000;
  let snapshot: AttentionItem[] = [];
  const sseClients = new Set<ServerResponse>();

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
    const changed = JSON.stringify(next) !== JSON.stringify(snapshot);
    snapshot = next;
    if (changed) broadcast();
    return snapshot;
  }

  function broadcast(): void {
    const payload = `data: ${JSON.stringify({ items: snapshot, summary: summarize(snapshot) })}\n\n`;
    for (const client of sseClients) client.write(payload);
  }

  function handle(req: IncomingMessage, res: ServerResponse): void {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname === "/api/items") {
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ items: snapshot, summary: summarize(snapshot) }));
      return;
    }
    if (url.pathname === "/api/events") {
      res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        connection: "keep-alive"
      });
      res.write(`data: ${JSON.stringify({ items: snapshot, summary: summarize(snapshot) })}\n\n`);
      sseClients.add(res);
      req.on("close", () => sseClients.delete(res));
      return;
    }
    serveStatic(url.pathname, res, options.webDist);
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
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(readFileSync(index));
    } else {
      res.writeHead(404);
      res.end("not found");
    }
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(path)] ?? "application/octet-stream" });
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
