import { existsSync, readFileSync } from "node:fs";

import { homedir } from "node:os";
import { join } from "node:path";

export type CheckLevel = "ok" | "warn" | "off";

export interface DoctorCheck {
  name: string;
  level: CheckLevel;
  detail: string;
}

export interface DoctorEnv {
  home?: string;
  env?: NodeJS.ProcessEnv;
  nodeVersion?: string;
  fetchImpl?: typeof fetch;
}

function contains(path: string, needle: string): boolean {
  try {
    return readFileSync(path, "utf8").includes(needle);
  } catch {
    return false;
  }
}

export async function runDoctor(opts: DoctorEnv = {}): Promise<DoctorCheck[]> {
  const home = opts.home ?? homedir();
  const env = opts.env ?? process.env;
  const nodeVersion = opts.nodeVersion ?? process.versions.node;
  const fetchImpl = opts.fetchImpl ?? fetch;
  const checks: DoctorCheck[] = [];

  const major = Number(nodeVersion.split(".")[0]);
  checks.push({
    name: "node",
    level: major >= 20 ? "ok" : "warn",
    detail: major >= 20 ? `v${nodeVersion}` : `v${nodeVersion} — Node 20+ recommended`
  });

  const claudeDir = join(home, ".claude", "projects");
  const claudeHooked = contains(join(home, ".claude", "settings.json"), "attnbox hook claude");
  checks.push({
    name: "claude-code",
    level: existsSync(claudeDir) ? (claudeHooked ? "ok" : "warn") : "off",
    detail: existsSync(claudeDir)
      ? claudeHooked
        ? "sessions found, hooks installed (authoritative)"
        : "sessions found, heuristic only — run `attnbox hooks --install` to upgrade"
      : "no ~/.claude/projects — collector inactive"
  });

  const codexDir = join(home, ".codex", "sessions");
  const codexHooksJson = contains(join(home, ".codex", "hooks.json"), "attnbox hook codex");
  const codexNotify = contains(join(home, ".codex", "config.toml"), "attnbox");
  checks.push({
    name: "codex",
    level: existsSync(codexDir) ? (codexHooksJson || codexNotify ? "ok" : "warn") : "off",
    detail: existsSync(codexDir)
      ? codexHooksJson
        ? "sessions found, hooks.json installed (authoritative waiting/approve)"
        : codexNotify
          ? "sessions found, notify fallback (turn-complete only) — see `attnbox hooks`"
          : "sessions found, heuristic only — run `attnbox hooks --install` to upgrade"
      : "no ~/.codex/sessions — collector inactive"
  });

  checks.push({
    name: "gemini",
    level: existsSync(join(home, ".gemini")) ? "ok" : "off",
    detail: existsSync(join(home, ".gemini"))
      ? "found (heuristic working/idle only, never claims waiting)"
      : "no ~/.gemini — collector inactive"
  });

  const devinKey = env["DEVIN_API_KEY"];
  if (!devinKey) {
    checks.push({ name: "devin", level: "off", detail: "DEVIN_API_KEY not set — cloud collector inactive" });
  } else {
    let detail = "DEVIN_API_KEY set";
    let level: CheckLevel = "ok";
    try {
      const res = await fetchImpl("https://api.devin.ai/v1/sessions?limit=1", {
        headers: { Authorization: `Bearer ${devinKey}` }
      });
      if (res.ok) detail = "API reachable, key valid";
      else {
        level = "warn";
        detail = `API returned HTTP ${res.status} — check DEVIN_API_KEY`;
      }
    } catch {
      level = "warn";
      detail = "API unreachable (network?) — inbox degrades to local-only";
    }
    checks.push({ name: "devin", level, detail });
  }

  const ghToken = env["ATTNBOX_GITHUB_TOKEN"] ?? env["GITHUB_TOKEN"];
  checks.push({
    name: "github-pr",
    level: ghToken ? "ok" : "off",
    detail: ghToken ? "token set — review-requested fallback active" : "no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive"
  });

  return checks;
}

const ICON: Record<CheckLevel, string> = { ok: "✓", warn: "!", off: "–" };

export function formatDoctor(checks: DoctorCheck[]): string {
  const width = Math.max(...checks.map((c) => c.name.length));
  return checks.map((c) => `${ICON[c.level]} ${c.name.padEnd(width)}  ${c.detail}`).join("\n");
}
