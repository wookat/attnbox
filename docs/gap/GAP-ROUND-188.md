# GAP-ROUND-188 — 本地采集器实弹抽查（纯文档）

Round 188. Driver dimension: local collector live-fire — Claude /
Codex / Gemini status derivation re-proven on this machine's real
session files (first since round-177).

## Evidence (v0.4.8, live daemon)

Baseline: 6 local sessions, all correctly `idle` (2 claude-code,
2 codex, 2 gemini).

- **Claude** (real transcript, backed up first): appended an
  unresolved assistant `tool_use` → `waiting` + `attention:
  "approve"` with the assistant text as detail; appended the
  matching `tool_result` → `working`; restored the original
  transcript → back to `idle`. Three-state round trip exact.
- **Codex** (temp rollout file): `exec_approval_request` →
  `waiting` + `attention: "approve"` with detail
  `wants to run: rm -rf /tmp/x` (command preview); appended
  `task_complete` → `idle`. Probe file deleted.
- **Gemini**: touching a project file mtime → `working` (never
  claims waiting — honest heuristic boundary holds); after probe
  cleanup the session decays back to `idle`.

Post-cleanup baseline re-checked: all 6 local sessions `idle`
again — zero probe residue. Daemon torn down, port verified clear.

## Verdict

All three local collectors derive status exactly per contract. No
P0/P1; docs-only, no changeset.
