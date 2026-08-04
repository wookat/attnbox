import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CodexCollector } from "./codex.js";

const now = new Date().toISOString();

function fixture(lines: object[]): string {
  const root = mkdtempSync(join(tmpdir(), "attnbox-codex-"));
  const day = join(root, "2026", "08", "04");
  mkdirSync(day, { recursive: true });
  writeFileSync(join(day, "rollout-x.jsonl"), lines.map((l) => JSON.stringify(l)).join("\n"));
  return root;
}

const meta = {
  type: "session_meta",
  timestamp: now,
  payload: { id: "sess-1", cwd: "/home/user/proj" }
};

describe("CodexCollector", () => {
  it("returns empty for a missing directory", async () => {
    expect(await new CodexCollector("/nonexistent").collect()).toEqual([]);
  });

  it("derives working from task_started", async () => {
    const root = fixture([
      meta,
      { type: "event_msg", timestamp: now, payload: { type: "user_message", message: "Refactor auth" } },
      { type: "event_msg", timestamp: now, payload: { type: "task_started" } }
    ]);
    const items = await new CodexCollector(root).collect();
    expect(items[0]).toMatchObject({
      id: "codex:sess-1",
      agent: "codex",
      status: "working",
      title: "Refactor auth",
      project: "/home/user/proj"
    });
  });

  it("derives idle from task_complete", async () => {
    const root = fixture([
      meta,
      { type: "event_msg", timestamp: now, payload: { type: "task_started" } },
      { type: "event_msg", timestamp: now, payload: { type: "task_complete" } }
    ]);
    const items = await new CodexCollector(root).collect();
    expect(items[0]?.status).toBe("idle");
  });

  it("derives waiting from an unresolved approval request", async () => {
    const root = fixture([
      meta,
      { type: "event_msg", timestamp: now, payload: { type: "task_started" } },
      { type: "event_msg", timestamp: now, payload: { type: "exec_approval_request" } }
    ]);
    const items = await new CodexCollector(root).collect();
    expect(items[0]).toMatchObject({ status: "waiting", attention: "approve" });
  });

  it("ignores rollouts without session_meta", async () => {
    const root = fixture([{ type: "event_msg", timestamp: now, payload: { type: "task_started" } }]);
    expect(await new CodexCollector(root).collect()).toEqual([]);
  });
});
