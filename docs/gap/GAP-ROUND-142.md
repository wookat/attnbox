# GAP-ROUND-142 — 本地采集器实弹抽查（纯文档）

Round 142. Driver dimension: local-collector real-data spot check —
first since round-124 (that round exercised Codex; this one
live-fires the Claude transcript heuristics).

## Evidence (real transcripts under `~/.claude/projects`, v0.4.8 CLI)

- Baseline: 6 real local sessions (2 codex, 2 claude-code, 2 gemini),
  no agent processes running — all correctly `idle`, zero false
  waiting/working.
- Live-fire approve heuristic: injected a probe transcript ending in
  an unresolved `tool_use` (Bash `./deploy.sh`) → surfaced within one
  collect as `waiting` / `attention: approve` / `confidence:
  heuristic`, with the user prompt as title and the project slug
  decoded.
- Resolution: appended the `tool_result` + assistant text tail →
  immediately re-derived `idle`, attention cleared.
- Stale-working cap: a transcript whose tail is a 20-minute-old user
  message derives `idle` (5-minute cap applied), while a fresh user
  tail derives `working` — both correct side by side.
- Cleanup: probe directories removed; zero residue.

## Verdict

Claude heuristics (approve-waiting, resolution, stale-working cap)
all hold on real transcript formats. No P0/P1; docs-only, no
changeset.
