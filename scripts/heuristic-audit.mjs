#!/usr/bin/env node
// Heuristic accuracy audit: compares the transcript-heuristic status of every
// local Claude Code / Codex session against the hook-recorded (authoritative)
// status for the same session, and prints a confusion matrix per agent.
//
// Ground truth only exists for sessions that ran while `attnbox hooks --install`
// was active, so the audit reports its own sample size — run real agent
// sessions first. Usage: `node scripts/heuristic-audit.mjs` (after `pnpm build`).
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ClaudeCollector, CodexCollector } from "../packages/collectors/dist/index.js";

const emptyDir = mkdtempSync(join(tmpdir(), "attnbox-audit-"));

async function audit(name, real, bare) {
  const [withHooks, heuristicOnly] = await Promise.all([real.collect(), bare.collect()]);
  const truth = new Map(
    withHooks.filter((i) => i.confidence === "authoritative").map((i) => [i.id, i.status])
  );
  const matrix = new Map();
  for (const item of heuristicOnly) {
    const expected = truth.get(item.id);
    if (!expected) continue;
    const key = `${expected} -> ${item.status}`;
    matrix.set(key, (matrix.get(key) ?? 0) + 1);
  }
  const total = [...matrix.values()].reduce((a, b) => a + b, 0);
  const correct = [...matrix.entries()]
    .filter(([k]) => k.split(" -> ")[0] === k.split(" -> ")[1])
    .reduce((a, [, n]) => a + n, 0);
  console.log(`\n${name}: ${total} session(s) with authoritative ground truth`);
  if (total === 0) {
    console.log("  (no hook-tracked sessions — run agents with `attnbox hooks --install` first)");
    return;
  }
  for (const [key, n] of [...matrix.entries()].sort()) console.log(`  ${key}: ${n}`);
  console.log(`  agreement: ${correct}/${total} (${((100 * correct) / total).toFixed(1)}%)`);
}

await audit("claude-code", new ClaudeCollector(), new ClaudeCollector(undefined, emptyDir));
await audit("codex", new CodexCollector(), new CodexCollector(undefined, emptyDir));
