#!/usr/bin/env node
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultCollectors } from "@attnbox/collectors";
import { createDaemon, listen } from "@attnbox/daemon";
import { sortItems, summarize } from "@attnbox/core";
import { formatList } from "./format.js";

const HELP = `attnbox — unified attention inbox for your AI coding agents

Usage:
  attnbox            Start the daemon and web inbox (http://127.0.0.1:4820)
  attnbox ls         One-shot: list sessions and who is waiting on you
  attnbox --help     Show this help

Options:
  --port <n>         Port for the web inbox (default 4820, env ATTNBOX_PORT)

Data stays on this machine. Cloud collectors activate only when their API
keys are configured (e.g. DEVIN_API_KEY).`;

function webDist(): string | undefined {
  const here = dirname(fileURLToPath(import.meta.url));
  for (const candidate of [
    join(here, "..", "web-dist"),
    join(here, "..", "..", "..", "apps", "web", "dist")
  ]) {
    if (existsSync(join(candidate, "index.html"))) return candidate;
  }
  return undefined;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    console.log(HELP);
    return;
  }

  const collectors = defaultCollectors();

  if (args[0] === "ls") {
    const results = await Promise.all(collectors.map((c) => c.collect().catch(() => [])));
    const items = sortItems(results.flat());
    const s = summarize(items);
    console.log(formatList(items));
    console.log(`\n${s.waiting} waiting on you · ${s.working} working · ${s.total} total`);
    return;
  }

  const portIdx = args.indexOf("--port");
  const port = portIdx >= 0 ? Number(args[portIdx + 1]) : Number(process.env["ATTNBOX_PORT"] ?? 4820);
  const dist = webDist();
  const daemon = createDaemon(dist ? { collectors, webDist: dist } : { collectors });
  await daemon.ready;
  const boundPort = await listen(daemon, port);
  console.log(`attnbox inbox running at http://127.0.0.1:${boundPort}`);
  if (!dist) console.log("(web UI not built — JSON API only at /api/items)");
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
