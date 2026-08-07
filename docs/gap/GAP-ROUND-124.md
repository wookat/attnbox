# GAP-ROUND-124 — 本地采集器实弹抽查（纯文档）

Round 124. Driver dimension: local-collector real-data spot check —
first since round-104 (which live-fired the Claude approve
heuristic); this round live-fires the **Codex** side.

## Evidence

- Baseline: 6 local sessions (2 claude-code, 2 codex, 2 gemini) all
  correctly `idle` — no stale-waiting noise from old probes.
- Codex live-fire probe (real rollout JSONL in
  `~/.codex/sessions/YYYY/MM/DD/`, matching the real
  `session_meta`/`event_msg` shape):
  - `task_started` + `exec_approval_request` → surfaced within one
    collect as `waiting/approve` with detail
    `wants to run: rm -rf /tmp/round124-scratch` — the "what is it
    asking" chain works end-to-end for local approve items too.
  - Appending `task_complete` → flips to `idle` (pendingApproval
    cleared). Probe file removed after the test.

## Verdict

No P0/P1; Codex rollout heuristic (round-1 era) still matches the
current rollout format. Docs-only; no changeset.
