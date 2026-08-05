import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export type InstallLevel = "installed" | "already" | "skipped" | "error";

export interface InstallResult {
  name: string;
  level: InstallLevel;
  detail: string;
}

interface HookEntry {
  matcher?: string;
  hooks?: { type?: string; command?: string; timeoutSec?: number }[];
}

const CLAUDE_EVENTS = ["Notification", "Stop", "UserPromptSubmit"] as const;
const CODEX_EVENTS = ["PermissionRequest", "Stop", "UserPromptSubmit"] as const;

function hasAttnboxHook(entries: unknown, command: string): boolean {
  if (!Array.isArray(entries)) return false;
  return entries.some(
    (e: HookEntry) => Array.isArray(e?.hooks) && e.hooks.some((h) => h?.command === command)
  );
}

function backup(path: string): void {
  if (existsSync(path)) copyFileSync(path, `${path}.attnbox-bak`);
}

function mergeHooksFile(
  path: string,
  events: readonly string[],
  entry: HookEntry,
  command: string
): "installed" | "already" | "error" {
  let root: Record<string, unknown> = {};
  if (existsSync(path)) {
    try {
      const parsed = JSON.parse(readFileSync(path, "utf8")) as unknown;
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return "error";
      root = parsed as Record<string, unknown>;
    } catch {
      return "error";
    }
  }
  const hooks = (root["hooks"] ?? {}) as Record<string, unknown>;
  if (typeof hooks !== "object" || Array.isArray(hooks)) return "error";
  let changed = false;
  for (const event of events) {
    const existing = hooks[event];
    if (hasAttnboxHook(existing, command)) continue;
    hooks[event] = Array.isArray(existing) ? [...existing, entry] : [entry];
    changed = true;
  }
  if (!changed) return "already";
  root["hooks"] = hooks;
  backup(path);
  writeFileSync(path, JSON.stringify(root, null, 2) + "\n");
  return "installed";
}

function ensureCodexFeatureFlag(configPath: string): "installed" | "already" | "error" {
  let text = "";
  if (existsSync(configPath)) {
    text = readFileSync(configPath, "utf8");
    if (/^\s*codex_hooks\s*=\s*true/m.test(text)) return "already";
    if (/^\s*codex_hooks\s*=/m.test(text)) return "error";
  }
  backup(configPath);
  const featuresHeader = /^\[features\]\s*$/m.exec(text);
  if (featuresHeader) {
    const at = featuresHeader.index + featuresHeader[0].length;
    text = `${text.slice(0, at)}\ncodex_hooks = true${text.slice(at)}`;
  } else {
    text = `${text.replace(/\n*$/, "\n")}\n[features]\ncodex_hooks = true\n`;
  }
  writeFileSync(configPath, text);
  return "installed";
}

/** Idempotently install attnbox authoritative hooks into Claude Code and Codex configs. */
export function installHooks(home: string = homedir()): InstallResult[] {
  const results: InstallResult[] = [];

  const claudeDir = join(home, ".claude");
  if (!existsSync(claudeDir)) {
    results.push({ name: "claude-code", level: "skipped", detail: "~/.claude not found — is Claude Code installed?" });
  } else {
    const path = join(claudeDir, "settings.json");
    const entry: HookEntry = { matcher: "", hooks: [{ type: "command", command: "attnbox hook claude" }] };
    const r = mergeHooksFile(path, CLAUDE_EVENTS, entry, "attnbox hook claude");
    results.push(
      r === "installed"
        ? { name: "claude-code", level: "installed", detail: `hooks merged into ${path} (backup: settings.json.attnbox-bak)` }
        : r === "already"
          ? { name: "claude-code", level: "already", detail: "hooks already installed" }
          : { name: "claude-code", level: "error", detail: `could not merge ${path} — fix or merge manually via \`attnbox hooks\`` }
    );
  }

  const codexDir = join(home, ".codex");
  if (!existsSync(codexDir)) {
    results.push({ name: "codex", level: "skipped", detail: "~/.codex not found — is Codex CLI installed?" });
  } else {
    const hooksPath = join(codexDir, "hooks.json");
    const entry: HookEntry = { hooks: [{ type: "command", command: "attnbox hook codex", timeoutSec: 1 }] };
    const hooksResult = mergeHooksFile(hooksPath, CODEX_EVENTS, entry, "attnbox hook codex");
    const flagResult = hooksResult === "error" ? "error" : ensureCodexFeatureFlag(join(codexDir, "config.toml"));
    const worst = hooksResult === "error" || flagResult === "error" ? "error" : hooksResult === "installed" || flagResult === "installed" ? "installed" : "already";
    results.push(
      worst === "installed"
        ? { name: "codex", level: "installed", detail: `hooks.json merged + codex_hooks = true set (backups: *.attnbox-bak)` }
        : worst === "already"
          ? { name: "codex", level: "already", detail: "hooks already installed" }
          : { name: "codex", level: "error", detail: `could not merge ${hooksPath} or config.toml — fix or merge manually via \`attnbox hooks\`` }
    );
  }

  return results;
}

const ICON: Record<InstallLevel, string> = { installed: "✓", already: "✓", skipped: "–", error: "!" };

export function formatInstall(results: InstallResult[]): string {
  const width = Math.max(...results.map((r) => r.name.length));
  return results.map((r) => `${ICON[r.level]} ${r.name.padEnd(width)}  ${r.detail}`).join("\n");
}
