# GAP-ROUND-245 — 竞品第十八批扫描（纯文档）

Round 245. Driver dimension: competitor scan — nine-repo
watchlist + new-entrant sweep, first since round-234.

## Watchlist

- **claude-notify** — the notable move: Phase 4 merged —
  **answer Claude's questions from Telegram** (remote
  act-in-place for a local agent), plus honest hardening
  (question text kept on-machine, keyboard withdrawn when the
  turn ends). This is the wild implementation of our remote
  local-agent-approval P2 observation advancing from notify-only
  to answer-capable; still single-runtime (Claude-only), no
  aggregation, so the core plane stays uncontested. Elevate to
  regular watch.
- **kookr** — steady high tempo (SSRF peer-URL rejection,
  pipeline-starvation counters, quota gate tuning); still no
  cloud-agent aggregation.
- **kelpie (misty-step)** — desktop app sprint continues (icons,
  focus ring, auto-reinstall on commit); herdr-ecosystem only.
- **ccmux / claude-dispatcher** — nothing beyond what round-234
  recorded (v1.3.0 wrap-up; Cockpit v3 command queue).
- **coslash** — commit-source plumbing only; **agentfleet** —
  same post-provision fixes already on file; **waiting-on-me /
  streamdeck-agents / herdr-island** — silent.

## New entrants

Sweep across "waiting on you" / "agent attention inbox"
(created >2026-08-07): nothing new beyond repos already on file.

## Verdict

Differentiation unchanged: local+cloud unified attention inbox
with zero-intrusion discovery remains uncontested. claude-notify
crossing from notify to remote-answer is the strongest signal
this batch — same direction as our shelved P2, single-runtime
scope keeps it non-overlapping. No P0/P1; docs-only, no
changeset.
