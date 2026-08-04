import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { SessionStatus } from "attnbox-core";

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
}

/** Persist a Codex notify event; called by `attnbox hook codex <json>`. */
export function recordCodexNotifyEvent(
  input: CodexNotifyInput,
  dir: string = defaultCodexHooksDir(),
  now: Date = new Date()
): CodexNotifyState | null {
  if (input.type !== "agent-turn-complete") return null;
  const threadId = input["thread-id"];
  if (!threadId || !/^[\w-]+$/.test(threadId)) return null;
  const message = input["last-assistant-message"];
  const state: CodexNotifyState = {
    threadId,
    status: "idle",
    event: input.type,
    updatedAt: now.toISOString(),
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
