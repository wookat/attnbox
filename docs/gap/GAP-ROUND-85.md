# GAP-ROUND-85 — 竞品扫描发现首个同文案直接进入者 + 数据健康度（纯文档）

Round 85. Driver dimensions: competitor research + dogfood data
analysis.

## Competitor scan (authenticated GitHub search, 2026-08-07)

New since the round-55/72 cohorts — two projects, documented in
`docs/COMPARISON.md` §四之三:

- **pulse-protocol / Agent Pulse** (2026-07-18, 1 star): the closest
  positioning match to date — "One inbox for every AI coding agent …
  which agent needs you right now", local CLI adapters, mobile PWA,
  ntfy push, away-mode remote Allow/Deny, waiting-time analytics.
  Still no cloud-agent coverage and requires adapter-side push (not
  zero-intrusion discovery).
- **grove** (2026-07-20, 0 stars, beta): tree-of-agents orchestrator
  with an attention inbox as a sub-feature; launcher quadrant.

Verdict: core differentiation (cloud-agent aggregation + zero-
intrusion discovery) still unmatched, but the "unified attention
inbox" framing now has same-wording entrants. Borrowable P2 ideas
recorded: away-mode remote approval for local agents (needs a
bidirectional hook channel — conflicts with read-only collection,
evaluate carefully), waiting-time analytics. ccmux: TUI polish only,
no attention-surface movement.

## Dogfood data health (live, 2,880 sessions)

7 waiting items, all fresh (6–25 min old); no stale-waiting noise; no
mis-stated status found spot-checking titles against the Devin
console. Full crawl steady at ~2,880 sessions with 0 API 4xx.

No new P0/P1. No code change; no changeset.
