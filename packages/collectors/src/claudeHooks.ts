import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { AttentionKind, SessionStatus } from "@attnbox/core";

/**
 * Authoritative mode for Claude Code: instead of guessing from the
 * transcript tail, Claude's own lifecycle hooks (`Notification`, `Stop`,
 * `UserPromptSubmit`, ...) invoke `attnbox hook claude`, which persists a
 * small per-session state file that the collector prefers over heuristics.
 */
export interface ClaudeHookState {
  sessionId: string;
  status: SessionStatus;
  attention?: AttentionKind;
  event: string;
  updatedAt: string;
}

export function defaultHooksDir(): string {
  return join(homedir(), ".attnbox", "hooks", "claude");
}

export interface ClaudeHookInput {
  session_id?: string;
  hook_event_name?: string;
  message?: string;
}

/** Map a Claude hook event to inbox state. Returns null for events we ignore. */
export function mapHookEvent(input: ClaudeHookInput): Omit<ClaudeHookState, "sessionId" | "updatedAt"> | null {
  const event = input.hook_event_name ?? "";
  switch (event) {
    case "Notification": {
      const message = (input.message ?? "").toLowerCase();
      const attention: AttentionKind = message.includes("permission") ? "approve" : "answer";
      return { status: "waiting", attention, event };
    }
    case "Stop":
    case "SubagentStop":
      return { status: "idle", event };
    case "UserPromptSubmit":
    case "PreToolUse":
    case "PostToolUse":
      return { status: "working", event };
    default:
      return null;
  }
}

/** Persist a hook event; called by `attnbox hook claude` with the hook's stdin JSON. */
export function recordClaudeHookEvent(
  input: ClaudeHookInput,
  dir: string = defaultHooksDir(),
  now: Date = new Date()
): ClaudeHookState | null {
  const sessionId = input.session_id;
  if (!sessionId || !/^[\w-]+$/.test(sessionId)) return null;
  const mapped = mapHookEvent(input);
  if (!mapped) return null;
  const state: ClaudeHookState = { sessionId, updatedAt: now.toISOString(), ...mapped };
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${sessionId}.json`), JSON.stringify(state));
  return state;
}

export function readClaudeHookState(sessionId: string, dir: string = defaultHooksDir()): ClaudeHookState | null {
  try {
    const parsed = JSON.parse(readFileSync(join(dir, `${sessionId}.json`), "utf8")) as ClaudeHookState;
    return typeof parsed.updatedAt === "string" && typeof parsed.status === "string" ? parsed : null;
  } catch {
    return null;
  }
}

/** Snippet for `~/.claude/settings.json` enabling authoritative mode. */
export function claudeHooksSettingsSnippet(): string {
  const hook = { matcher: "", hooks: [{ type: "command", command: "attnbox hook claude" }] };
  return JSON.stringify(
    {
      hooks: {
        Notification: [hook],
        Stop: [hook],
        UserPromptSubmit: [hook]
      }
    },
    null,
    2
  );
}
