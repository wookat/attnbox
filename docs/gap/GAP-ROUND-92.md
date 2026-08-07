# GAP-ROUND-92 — 竞品动向复查 + 本地采集器抽查（纯文档）

Round 92. Driver dimensions: competitor research + local collector
spot audit.

## Competitor movement (commit-level check, 2026-08-07)

- **ccmux**: skills split / TUI terminal-mode fixes / handoff polish —
  no attention-surface movement.
- **pulse-protocol**: no commits since 2026-07-30 (hook-repair fix);
  single-maintainer cadence slowing, threat level unchanged (low).
- **grove**: no commits since 2026-07-25; AI-review features, inbox
  untouched.
- **omnigent**: iOS/infra churn; notably *reverted* its
  approval/attribution stack (#4318) — their in-app approval surface
  is in flux, no new inbox capability shipped.
- New-entrant search: nothing new since the round-85 cohort.

## Local collector spot audit (this box)

The 6 local sessions (2 Claude Code probe transcripts, 2 Codex
rollouts, 2 Gemini tmp dirs — all idle leftovers from earlier probe
rounds) are each reported `idle` with correct titles; no phantom
waiting, no stale `working`. Faithful at the small-N local end while
the cloud end runs at 2,896 sessions.

## Verdict

No new P0/P1; no competitor threat change; positioning unchanged.
Docs-only; no changeset.
