import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ClaudeCollector } from "./claude.js";
import {
  claudeHooksSettingsSnippet,
  mapHookEvent,
  readClaudeHookState,
  recordClaudeHookEvent
} from "./claudeHooks.js";

describe("mapHookEvent", () => {
  it("maps Notification with permission text to waiting/approve", () => {
    expect(mapHookEvent({ hook_event_name: "Notification", message: "Claude needs your permission to use Bash" }))
      .toMatchObject({ status: "waiting", attention: "approve" });
  });

  it("maps other Notifications to waiting/answer", () => {
    expect(mapHookEvent({ hook_event_name: "Notification", message: "Claude is waiting for your input" }))
      .toMatchObject({ status: "waiting", attention: "answer" });
  });

  it("maps Stop to idle and UserPromptSubmit to working", () => {
    expect(mapHookEvent({ hook_event_name: "Stop" })).toMatchObject({ status: "idle" });
    expect(mapHookEvent({ hook_event_name: "UserPromptSubmit" })).toMatchObject({ status: "working" });
  });

  it("ignores unknown events", () => {
    expect(mapHookEvent({ hook_event_name: "SessionStart" })).toBeNull();
  });
});

describe("recordClaudeHookEvent / readClaudeHookState", () => {
  it("round-trips a hook event", () => {
    const dir = mkdtempSync(join(tmpdir(), "attnbox-hooks-"));
    const state = recordClaudeHookEvent({ session_id: "sess-1", hook_event_name: "Stop" }, dir);
    expect(state?.status).toBe("idle");
    expect(readClaudeHookState("sess-1", dir)).toMatchObject({ sessionId: "sess-1", status: "idle" });
  });

  it("rejects unsafe session ids", () => {
    const dir = mkdtempSync(join(tmpdir(), "attnbox-hooks-"));
    expect(recordClaudeHookEvent({ session_id: "../evil", hook_event_name: "Stop" }, dir)).toBeNull();
    expect(recordClaudeHookEvent({ hook_event_name: "Stop" }, dir)).toBeNull();
  });
});

describe("ClaudeCollector hook integration", () => {
  it("prefers a fresher hook state over the transcript heuristic", async () => {
    const root = mkdtempSync(join(tmpdir(), "attnbox-claude-"));
    const projectDir = join(root, "-p");
    mkdirSync(projectDir);
    writeFileSync(
      join(projectDir, "sess-9.jsonl"),
      JSON.stringify({
        type: "user",
        timestamp: new Date(Date.now() - 60_000).toISOString(),
        message: { role: "user", content: "Do a thing" }
      })
    );
    const hooksDir = mkdtempSync(join(tmpdir(), "attnbox-hooks-"));
    recordClaudeHookEvent(
      { session_id: "sess-9", hook_event_name: "Notification", message: "needs your permission" },
      hooksDir
    );
    const items = await new ClaudeCollector(root, hooksDir).collect();
    expect(items[0]).toMatchObject({ status: "waiting", attention: "approve", confidence: "authoritative" });
  });

  it("ignores hook state older than the transcript", async () => {
    const root = mkdtempSync(join(tmpdir(), "attnbox-claude-"));
    const projectDir = join(root, "-p");
    mkdirSync(projectDir);
    const hooksDir = mkdtempSync(join(tmpdir(), "attnbox-hooks-"));
    recordClaudeHookEvent({ session_id: "sess-9", hook_event_name: "Stop" }, hooksDir, new Date(Date.now() - 120_000));
    writeFileSync(
      join(projectDir, "sess-9.jsonl"),
      JSON.stringify({
        type: "user",
        timestamp: new Date().toISOString(),
        message: { role: "user", content: "Do a thing" }
      })
    );
    const items = await new ClaudeCollector(root, hooksDir).collect();
    expect(items[0]?.status).toBe("working");
  });
});

describe("claudeHooksSettingsSnippet", () => {
  it("emits valid JSON wiring the attnbox hook command", () => {
    const parsed = JSON.parse(claudeHooksSettingsSnippet()) as {
      hooks: Record<string, { hooks: { command: string }[] }[]>;
    };
    expect(Object.keys(parsed.hooks)).toEqual(["Notification", "Stop", "UserPromptSubmit"]);
    expect(parsed.hooks["Notification"]?.[0]?.hooks[0]?.command).toBe("attnbox hook claude");
  });
});
