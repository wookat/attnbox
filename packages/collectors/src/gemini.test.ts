import { mkdirSync, mkdtempSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GeminiCollector } from "./gemini.js";

function fixture(opts: { old?: boolean } = {}): string {
  const root = mkdtempSync(join(tmpdir(), "attnbox-gemini-"));
  const projectDir = join(root, "tmp", "myproj");
  mkdirSync(projectDir, { recursive: true });
  writeFileSync(join(projectDir, ".project_root"), "/home/user/repos/myproj\n");
  writeFileSync(join(projectDir, "logs.json"), "[]");
  writeFileSync(
    join(root, "projects.json"),
    JSON.stringify({ projects: { "/home/user/repos/myproj": "myproj" } })
  );
  if (opts.old) {
    const past = (Date.now() - 60 * 60 * 1000) / 1000;
    for (const f of [".project_root", "logs.json"]) utimesSync(join(projectDir, f), past, past);
  }
  return root;
}

describe("GeminiCollector", () => {
  it("returns empty for a missing directory", async () => {
    expect(await new GeminiCollector("/nonexistent").collect()).toEqual([]);
  });

  it("reports recent activity as working, never waiting", async () => {
    const items = await new GeminiCollector(fixture()).collect();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: "gemini:myproj",
      agent: "gemini",
      status: "working",
      confidence: "heuristic",
      title: "myproj",
      project: "/home/user/repos/myproj"
    });
    expect(items[0]?.attention).toBeUndefined();
  });

  it("reports stale projects as idle", async () => {
    const items = await new GeminiCollector(fixture({ old: true })).collect();
    expect(items[0]?.status).toBe("idle");
  });
});
