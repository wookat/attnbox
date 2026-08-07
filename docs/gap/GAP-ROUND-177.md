# GAP-ROUND-177 — 本地采集器实弹抽查（纯文档）

Round 177. Driver dimension: local collectors live-fire — status
derivation for Claude / Codex / Gemini re-verified against real
local files (first since round-161).

## Evidence (v0.4.8 collectors on this machine)

Baseline: 6 local sessions (2 Claude / 2 Codex / 2 Gemini), all
idle — correct.

- **Claude**: appended an unresolved assistant `tool_use` to a real
  probe transcript → session flips to `waiting/approve`; appending
  the matching `tool_result` → `working`; restoring the original
  file → back to `idle`. Full tri-state round-trip exact.
- **Codex**: temp rollout with `task_started` + `user_message` +
  `exec_approval_request` → `waiting/approve` with detail
  ("wants to run a command"); appending `task_complete` → `idle`;
  probe file removed, baseline restored.
- **Gemini**: touching a project file under `~/.gemini/tmp/probe`
  → `working` (mtime heuristic); never claims waiting — honest
  boundary holds.

Probe residue: 0 (Claude transcript restored byte-identical from
backup, Codex probe file deleted, Gemini touch is mtime-only).

## Verdict

All three local collector status contracts hold live. No P0/P1;
docs-only, no changeset.
