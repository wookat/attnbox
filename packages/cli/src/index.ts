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
import { formatDoctor, runDoctor } from "./doctor.js";
import { formatInstall, installHooks } from "./hooksInstall.js";

const HELP = `attnbox — unified attention inbox for your AI coding agents

Usage:
  attnbox            Start the daemon and web inbox (http://127.0.0.1:4820)
  attnbox ls         One-shot: list sessions and who is waiting on you
                     (--waiting: only items waiting on you; --json: machine output)
  attnbox hooks      Print the config snippets enabling authoritative status
                     via Claude Code hooks and the Codex notify hook
                     (--install: merge them into your configs, with backups)
  attnbox doctor     Check which collectors are active and how to upgrade them
  attnbox hook claude   (used by Claude hooks) record a hook event from stdin
  attnbox hook codex    (used by Codex hooks/notify) record a lifecycle event
  attnbox --help     Show this help

Options:
  --port <n>         Port for the web inbox (default 4820, env ATTNBOX_PORT)
  --host <addr>      Bind address (default 127.0.0.1, env ATTNBOX_HOST).
                     Binding beyond loopback (e.g. for your phone on the same
                     network) requires ATTNBOX_TOKEN; open the inbox as
                     http://<host>:<port>/?token=<token>. Prefer a private
                     tailnet/VPN over exposing a LAN port.

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

  if (args[0] === "doctor") {
    const checks = await runDoctor();
    console.log(formatDoctor(checks));
    if (checks.some((c) => c.level === "warn")) process.exitCode = 1;
    return;
  }

  if (args[0] === "hooks" && args.includes("--install")) {
    const results = installHooks();
    console.log(formatInstall(results));
    if (results.some((r) => r.level === "error")) process.exitCode = 1;
    else if (results.some((r) => r.level === "installed")) {
      console.log("\nRestart your agent sessions to pick up the hooks, then run `attnbox doctor` to verify.");
    }
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

  const known = new Set(["ls", "hooks", "hook", "doctor", undefined]);
  if (!known.has(args[0]) && !args[0]?.startsWith("--")) {
    console.error(`attnbox: unknown command "${args[0]}" — run \`attnbox --help\``);
    process.exitCode = 1;
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
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    console.error(`attnbox: invalid port "${portIdx >= 0 ? args[portIdx + 1] : process.env["ATTNBOX_PORT"]}" — expected a number between 0 and 65535`);
    process.exitCode = 1;
    return;
  }
  const hostIdx = args.indexOf("--host");
  const host = hostIdx >= 0 ? (args[hostIdx + 1] ?? "") : (process.env["ATTNBOX_HOST"] ?? "127.0.0.1");
  if (host === "" || host.startsWith("--")) {
    console.error("attnbox: --host expects a bind address, e.g. `attnbox --host 0.0.0.0`");
    process.exitCode = 1;
    return;
  }
  const loopback = host === "127.0.0.1" || host === "::1" || host === "localhost";
  const token = process.env["ATTNBOX_TOKEN"];
  if (!loopback && !token) {
    console.error(
      `attnbox: refusing to bind ${host} without a token — anyone who can reach that address could read your agent activity and reply to your Devin sessions.\nSet ATTNBOX_TOKEN to a long random secret, then open http://${host}:<port>/?token=<that token> on the other device.`
    );
    process.exitCode = 1;
    return;
  }
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
    ...(reply ? { reply } : {}),
    ...(!loopback && token ? { token } : {})
  });
  await daemon.ready;
  let boundPort: number;
  try {
    boundPort = await listen(daemon, port, host);
  } catch (err) {
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "EADDRINUSE") {
      console.error(`attnbox: port ${port} is already in use — is another attnbox running? Try \`attnbox --port <n>\``);
      process.exitCode = 1;
      return;
    }
    throw err;
  }
  console.log(`attnbox inbox running at http://${loopback ? "127.0.0.1" : host}:${boundPort}`);
  if (!loopback) console.log("non-loopback bind: /api/* requires the ATTNBOX_TOKEN (open /?token=<token> once per device)");
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
