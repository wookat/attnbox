# GAP-ROUND-161 — 本地采集器实弹抽查（纯文档）

Round 161. Driver dimension: local collector live-fire — all three
local collectors probed through their real data directories (first
since round-142; first round exercising all three in one pass).

## Evidence (real data paths, v0.4.8 CLI)

- Baseline: 6 local sessions (2 claude / 2 codex / 2 gemini) all
  correctly `idle` (stale by days).
- Claude (`~/.claude/projects/…jsonl`): unresolved `tool_use` tail →
  `waiting`/`approve`; appending the `tool_result` (user entry) flips
  it to `working` in the next collect — both transitions correct.
- Codex (`~/.codex/sessions/…rollout-*.jsonl`):
  `exec_approval_request` → `waiting`/`approve` with
  `detail: "wants to run: rm -rf build"`; `task_complete` →
  `idle` — detail preview and lifecycle both correct.
- Gemini (`~/.gemini/tmp/<project>/`): fresh file mtime →
  `working` heuristic fires; never claims waiting (honest boundary
  holds).
- Probe files removed; post-cleanup local surface back to the
  6-session idle baseline, 0 probe residue.

## Verdict

All three local collectors' status derivation correct on live data
paths. No P0/P1; docs-only, no changeset.
