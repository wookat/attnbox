# GAP-ROUND-199 — 本地采集器实弹抽查（纯文档）

Round 199. Driver dimension: local collectors live-fire — Claude /
Codex / Gemini on-machine state derivation (first since round-188).

## Evidence (v0.4.8, live probe daemon, real files under `$HOME`)

- Baseline: all 6 local sessions correctly `idle` (2 claude-code, 2
  codex, 2 gemini).
- **Claude** (transcript backed up first): append unresolved
  `tool_use` → `waiting` + `attention: approve` with detail;
  append matching `tool_result` → `working`. Transcript restored →
  back to `idle`.
- **Codex**: synthetic rollout with `exec_approval_request` →
  `waiting` + `approve` with the exact command preview
  ("wants to run: bash -lc ls /tmp/r199-probe"); append
  `task_complete` → `idle`. The probe metadata's command was never
  executed; rollout file deleted.
- **Gemini**: touch a file under `~/.gemini/tmp/probe` → `working`
  (never claims waiting); cleanup → `idle`.
- Post-cleanup sweep: all 6 sessions back to `idle`; probe daemon
  torn down, port clear, `~/.gemini/tmp/probe` holds only
  `.project_root`, no rollout residue.

## Verdict

All three collectors' state semantics hold exactly. No P0/P1;
docs-only, no changeset.
