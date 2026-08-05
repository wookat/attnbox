import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { AttentionKind, SessionStatus } from "attnbox-core";

/**
 * Authoritative mode for Codex CLI via its `notify` program hook: Codex
 * invokes `attnbox hook codex` with a JSON payload as the final argument
 * when an agent turn completes. The persisted per-thread state lets the
 * collector mark "turn finished, waiting for your next prompt" precisely
 * instead of relying on the rollout heuristic alone.
 */
export interface CodexNotifyState {
  threadId: string;
  status: SessionStatus;
  attention?: AttentionKind;
  event: string;
  lastAssistantMessage?: string;
  updatedAt: string;
}

export function defaultCodexHooksDir(): string {
  return join(homedir(), ".attnbox", "hooks", "codex");
}

export interface CodexNotifyInput {
  type?: string;
  "thread-id"?: string;
  "last-assistant-message"?: string | null;
  /** hooks.json lifecycle events (`[features] codex_hooks`) */
  hook_event_name?: string;
  session_id?: string;
}

/** Map a Codex hooks.json lifecycle event to inbox state. Returns null for events we ignore. */
export function mapCodexHookEvent(
  event: string
): { status: SessionStatus; attention?: AttentionKind } | null {
  switch (event) {
    case "PermissionRequest":
      return { status: "waiting", attention: "approve" };
    case "Stop":
    case "SubagentStop":
    case "SessionStart":
      return { status: "idle" };
    case "UserPromptSubmit":
    case "PreToolUse":
    case "PostToolUse":
      return { status: "working" };
    default:
      return null;
  }
}

/**
 * Persist a Codex event; called by `attnbox hook codex`. Accepts both the
 * legacy `notify` argv payload (`agent-turn-complete`, keyed by thread-id)
 * and hooks.json stdin payloads (keyed by session_id) — both ids name the
 * same rollout session.
 */
export function recordCodexNotifyEvent(
  input: CodexNotifyInput,
  dir: string = defaultCodexHooksDir(),
  now: Date = new Date()
): CodexNotifyState | null {
  let threadId: string | undefined;
  let mapped: { status: SessionStatus; attention?: AttentionKind } | null = null;
  let event: string;
  let message: string | null | undefined;

  if (input.hook_event_name) {
    threadId = input.session_id;
    event = input.hook_event_name;
    mapped = mapCodexHookEvent(event);
  } else {
    if (input.type !== "agent-turn-complete") return null;
    threadId = input["thread-id"];
    event = input.type;
    mapped = { status: "idle" };
    message = input["last-assistant-message"];
  }

  if (!mapped) return null;
  if (!threadId || !/^[\w-]+$/.test(threadId)) return null;
  const state: CodexNotifyState = {
    threadId,
    status: mapped.status,
    event,
    updatedAt: now.toISOString(),
    ...(mapped.attention ? { attention: mapped.attention } : {}),
    ...(typeof message === "string" && message.trim() !== "" ? { lastAssistantMessage: message } : {})
  };
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${threadId}.json`), JSON.stringify(state));
  return state;
}

export function readCodexNotifyState(threadId: string, dir: string = defaultCodexHooksDir()): CodexNotifyState | null {
  try {
    const parsed = JSON.parse(readFileSync(join(dir, `${threadId}.json`), "utf8")) as CodexNotifyState;
    return typeof parsed.updatedAt === "string" && typeof parsed.status === "string" ? parsed : null;
  } catch {
    return null;
  }
}

/** Snippet for `~/.codex/config.toml` enabling authoritative turn-complete state. */
export function codexNotifySettingsSnippet(): string {
  return 'notify = ["attnbox", "hook", "codex"]';
}

/** Snippet for `~/.codex/hooks.json` enabling authoritative lifecycle events (requires `[features] codex_hooks = true` in config.toml). */
export function codexHooksJsonSnippet(): string {
  const hook = { hooks: [{ type: "command", command: "attnbox hook codex", timeoutSec: 1 }] };
  return JSON.stringify(
    {
      hooks: {
        PermissionRequest: [hook],
        Stop: [hook],
        UserPromptSubmit: [hook]
      }
    },
    null,
    2
  );
}
