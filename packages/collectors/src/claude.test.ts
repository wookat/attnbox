import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ClaudeCollector, decodeProjectSlug } from "./claude.js";

function fixture(lines: object[]): string {
  const root = mkdtempSync(join(tmpdir(), "attnbox-claude-"));
  const projectDir = join(root, "-home-user-repos-app");
  mkdirSync(projectDir, { recursive: true });
  writeFileSync(join(projectDir, "abc-123.jsonl"), lines.map((l) => JSON.stringify(l)).join("\n"));
  return root;
}

const now = new Date().toISOString();

const userEntry = {
  type: "user",
  timestamp: now,
  message: { role: "user", content: "Fix the login bug" }
};

describe("ClaudeCollector", () => {
  it("returns empty for a missing directory", async () => {
    const items = await new ClaudeCollector("/nonexistent/path").collect();
    expect(items).toEqual([]);
  });

  it("derives working when the last entry is a user message", async () => {
    const root = fixture([userEntry]);
    const items = await new ClaudeCollector(root).collect();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: "claude-code:abc-123",
      agent: "claude-code",
      status: "working",
      title: "Fix the login bug",
      project: "/home/user/repos/app"
    });
  });

  it("derives waiting (approve) on an unresolved tool_use tail", async () => {
    const root = fixture([
      userEntry,
      {
        type: "assistant",
        timestamp: now,
        message: { role: "assistant", content: [{ type: "tool_use", name: "Bash" }] }
      }
    ]);
    const items = await new ClaudeCollector(root).collect();
    expect(items[0]).toMatchObject({ status: "waiting", attention: "approve" });
  });

  it("derives idle when the assistant finished with text", async () => {
    const root = fixture([
      userEntry,
      {
        type: "assistant",
        timestamp: now,
        message: { role: "assistant", content: [{ type: "text", text: "Done." }] }
      }
    ]);
    const items = await new ClaudeCollector(root).collect();
    expect(items[0]?.status).toBe("idle");
  });

  it("caps stale working sessions to idle", async () => {
    const root = fixture([{ ...userEntry, timestamp: "2026-01-01T00:00:00Z" }]);
    const items = await new ClaudeCollector(root).collect();
    expect(items[0]?.status).toBe("idle");
  });

  it("skips malformed lines without dropping the session", async () => {
    const root = mkdtempSync(join(tmpdir(), "attnbox-claude-"));
    const projectDir = join(root, "-p");
    mkdirSync(projectDir);
    writeFileSync(join(projectDir, "s1.jsonl"), `not-json\n${JSON.stringify(userEntry)}\n`);
    const items = await new ClaudeCollector(root).collect();
    expect(items).toHaveLength(1);
  });
});

describe("decodeProjectSlug", () => {
  it("decodes a path slug", () => {
    expect(decodeProjectSlug("-home-user-repos-app")).toBe("/home/user/repos/app");
  });
});
