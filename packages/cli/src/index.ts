#!/usr/bin/env node
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  claudeHooksSettingsSnippet,
  codexHooksJsonSnippet,
  codexNotifySettingsSnippet,
  defaultCollectors,
  recordClaudeHookEvent,
  recordCodexNotifyEvent,
  sendDevinMessage
} from "attnbox-collectors";
import { createDaemon, listen, type ReplyResult } from "attnbox-daemon";
import { sortItems, summarize } from "attnbox-core";
import { formatList } from "./format.js";

const HELP = `attnbox — unified attention inbox for your AI coding agents

Usage:
  attnbox            Start the daemon and web inbox (http://127.0.0.1:4820)
  attnbox ls         One-shot: list sessions and who is waiting on you
                     (--waiting: only items waiting on you; --json: machine output)
  attnbox hooks      Print the config snippets enabling authoritative status
                     via Claude Code hooks and the Codex notify hook
  attnbox hook claude   (used by Claude hooks) record a hook event from stdin
  attnbox hook codex    (used by Codex hooks/notify) record a lifecycle event
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

  if (args[0] === "hooks") {
    console.log("# merge into ~/.claude/settings.json:");
    console.log(claudeHooksSettingsSnippet());
    console.log("\n# merge into ~/.codex/hooks.json (authoritative waiting/approve; needs `[features] codex_hooks = true` in ~/.codex/config.toml):");
    console.log(codexHooksJsonSnippet());
    console.log("\n# or minimal fallback — add to ~/.codex/config.toml (turn-complete only):");
    console.log(codexNotifySettingsSnippet());
    return;
  }

  if (args[0] === "hook" && args[1] === "claude") {
    const raw = await readStdin();
    try {
      recordClaudeHookEvent(JSON.parse(raw) as Parameters<typeof recordClaudeHookEvent>[0]);
    } catch {
      // never fail the hook — Claude would surface the error to the user
    }
    return;
  }

  if (args[0] === "hook" && args[1] === "codex") {
    // Codex passes the JSON payload as the final argv argument.
    const raw = args[2] ?? (await readStdin());
    try {
      recordCodexNotifyEvent(JSON.parse(raw) as Parameters<typeof recordCodexNotifyEvent>[0]);
    } catch {
      // never fail the hook
    }
    return;
  }

  const collectors = defaultCollectors();

  if (args[0] === "ls") {
    const results = await Promise.all(collectors.map((c) => c.collect().catch(() => [])));
    let items = sortItems(results.flat());
    const s = summarize(items);
    if (args.includes("--waiting")) items = items.filter((i) => i.status === "waiting");
    if (args.includes("--json")) {
      console.log(JSON.stringify({ items, summary: s }, null, 2));
      return;
    }
    console.log(formatList(items));
    console.log(`\n${s.waiting} waiting on you · ${s.working} working · ${s.total} total`);
    return;
  }

  const portIdx = args.indexOf("--port");
  const port = portIdx >= 0 ? Number(args[portIdx + 1]) : Number(process.env["ATTNBOX_PORT"] ?? 4820);
  const dist = webDist();
  const devinKey = process.env["DEVIN_API_KEY"];
  const reply = devinKey
    ? async (itemId: string, message: string): Promise<ReplyResult> => {
        if (!itemId.startsWith("devin:")) return { ok: false, error: "replies are only supported for devin items" };
        return sendDevinMessage(devinKey, itemId.slice("devin:".length), message);
      }
    : undefined;
  const daemon = createDaemon({
    collectors,
    ...(dist ? { webDist: dist } : {}),
    ...(reply ? { reply } : {})
  });
  await daemon.ready;
  const boundPort = await listen(daemon, port);
  console.log(`attnbox inbox running at http://127.0.0.1:${boundPort}`);
  if (!dist) console.log("(web UI not built — JSON API only at /api/items)");
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString("utf8");
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
