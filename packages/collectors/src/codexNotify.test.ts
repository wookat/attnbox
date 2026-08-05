import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CodexCollector } from "./codex.js";
import {
  codexHooksJsonSnippet,
  codexNotifySettingsSnippet,
  mapCodexHookEvent,
  readCodexNotifyState,
  recordCodexNotifyEvent
} from "./codexNotify.js";

function tempDir(): string {
  return mkdtempSync(join(tmpdir(), "attnbox-codex-notify-"));
}

describe("recordCodexNotifyEvent", () => {
  it("persists agent-turn-complete as idle and round-trips from disk", () => {
    const dir = tempDir();
    const state = recordCodexNotifyEvent(
      {
        type: "agent-turn-complete",
        "thread-id": "thread-1",
        "last-assistant-message": "done, tests pass"
      },
      dir,
      new Date("2026-08-04T12:00:00Z")
    );
    expect(state).toMatchObject({ threadId: "thread-1", status: "idle", event: "agent-turn-complete" });
    expect(readCodexNotifyState("thread-1", dir)).toMatchObject({
      status: "idle",
      lastAssistantMessage: "done, tests pass",
      updatedAt: "2026-08-04T12:00:00.000Z"
    });
  });

  it("ignores other event types and unsafe thread ids", () => {
    const dir = tempDir();
    expect(recordCodexNotifyEvent({ type: "something-else", "thread-id": "t" }, dir)).toBeNull();
    expect(recordCodexNotifyEvent({ type: "agent-turn-complete", "thread-id": "../evil" }, dir)).toBeNull();
    expect(recordCodexNotifyEvent({ type: "agent-turn-complete" }, dir)).toBeNull();
  });

  it("persists hooks.json PermissionRequest as waiting/approve", () => {
    const dir = tempDir();
    const state = recordCodexNotifyEvent(
      { hook_event_name: "PermissionRequest", session_id: "sess-1" },
      dir,
      new Date("2026-08-05T12:00:00Z")
    );
    expect(state).toMatchObject({ threadId: "sess-1", status: "waiting", attention: "approve", event: "PermissionRequest" });
    expect(readCodexNotifyState("sess-1", dir)).toMatchObject({ status: "waiting", attention: "approve" });
  });

  it("maps hooks.json lifecycle events and rejects unknown ones", () => {
    expect(mapCodexHookEvent("Stop")).toEqual({ status: "idle" });
    expect(mapCodexHookEvent("SubagentStop")).toEqual({ status: "idle" });
    expect(mapCodexHookEvent("SessionStart")).toEqual({ status: "idle" });
    expect(mapCodexHookEvent("UserPromptSubmit")).toEqual({ status: "working" });
    expect(mapCodexHookEvent("PreToolUse")).toEqual({ status: "working" });
    expect(mapCodexHookEvent("SomethingElse")).toBeNull();
    const dir = tempDir();
    expect(recordCodexNotifyEvent({ hook_event_name: "SessionEnd", session_id: "s" }, dir)).toBeNull();
    expect(recordCodexNotifyEvent({ hook_event_name: "Stop", session_id: "../evil" }, dir)).toBeNull();
  });
});

describe("CodexCollector notify integration", () => {
  function writeRollout(dir: string, sessionId: string, lastTs: string): void {
    const day = join(dir, "2026", "08", "04");
    mkdirSync(day, { recursive: true });
    const lines = [
      { type: "session_meta", timestamp: lastTs, payload: { id: sessionId, cwd: "/tmp/proj" } },
      { type: "event_msg", timestamp: lastTs, payload: { type: "task_started" } }
    ];
    writeFileSync(join(day, `rollout-${sessionId}.jsonl`), lines.map((l) => JSON.stringify(l)).join("\n"));
  }

  it("fresh notify state supersedes the rollout heuristic", async () => {
    const sessions = tempDir();
    const hooks = tempDir();
    writeRollout(sessions, "abc", "2026-08-04T10:00:00Z");
    recordCodexNotifyEvent(
      { type: "agent-turn-complete", "thread-id": "abc" },
      hooks,
      new Date("2026-08-04T11:00:00Z")
    );
    const items = await new CodexCollector(sessions, hooks).collect();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ id: "codex:abc", status: "idle", confidence: "authoritative" });
  });

  it("PermissionRequest hook state marks the session waiting for approval", async () => {
    const sessions = tempDir();
    const hooks = tempDir();
    writeRollout(sessions, "abc", "2026-08-04T10:00:00Z");
    recordCodexNotifyEvent(
      { hook_event_name: "PermissionRequest", session_id: "abc" },
      hooks,
      new Date("2026-08-04T11:00:00Z")
    );
    const items = await new CodexCollector(sessions, hooks).collect();
    expect(items[0]).toMatchObject({
      id: "codex:abc",
      status: "waiting",
      attention: "approve",
      confidence: "authoritative"
    });
  });

  it("stale notify state is ignored", async () => {
    const sessions = tempDir();
    const hooks = tempDir();
    writeRollout(sessions, "abc", new Date().toISOString());
    recordCodexNotifyEvent(
      { type: "agent-turn-complete", "thread-id": "abc" },
      hooks,
      new Date("2026-08-04T00:00:00Z")
    );
    const items = await new CodexCollector(sessions, hooks).collect();
    expect(items[0]).toMatchObject({ status: "working", confidence: "heuristic" });
  });
});

describe("codexNotifySettingsSnippet", () => {
  it("wires notify to attnbox hook codex", () => {
    expect(codexNotifySettingsSnippet()).toBe('notify = ["attnbox", "hook", "codex"]');
  });
});

describe("codexHooksJsonSnippet", () => {
  it("is valid JSON wiring PermissionRequest/Stop/UserPromptSubmit to attnbox", () => {
    const parsed = JSON.parse(codexHooksJsonSnippet()) as {
      hooks: Record<string, { hooks: { command: string }[] }[]>;
    };
    for (const event of ["PermissionRequest", "Stop", "UserPromptSubmit"]) {
      expect(parsed.hooks[event]?.[0]?.hooks[0]?.command).toBe("attnbox hook codex");
    }
  });
});
