# GAP-ROUND-226 — 竞品第十六批扫描（纯文档）

Round 226. Driver dimension: competitor scan — eight-repo
watchlist + new-entrant sweep, first since round-216.

## Watchlist (commits since round-216 window)

- **kookr** — active: pipeline-starvation counters in `kookr
  status`, SSRF hardening extended (rejects cloud-metadata /
  link-local peer URLs pre-fetch), tunable quota headroom gate,
  Escape/focus-trap fixes. Still no cloud-agent aggregation.
- **ccmux** — v1.3.0 released (formalizes round-207 handoff
  work); this window is docs polish + relay-skill trigger
  broadening only.
- **coslash** — active again after silence: commit/amend
  detection hardening, v0.0.1 README. Still local-only.
- **kelpie** — desktop sprint continues (keyboard navigation
  across agents, thinking-level icons, brand focus ring);
  herdr-bound, single-operator.
- **claude-dispatcher** — Windows support landed, cockpit now
  the default, process supervisor extracted behind an OS seam,
  release automation. Claude-only single runtime unchanged.
- **agentfleet** — follow-up fixes from its first real cloud
  provision; remains the closest multi-machine local-plane
  watch item.
- **waiting-on-me / streamdeck-agents** — silent since late July.

## New entrants

- **oleg-vasilyev/claude-notify** (2026-08-06, 0★) — Telegram
  pings from Claude Code "when the agent is waiting on you — but
  only once you have actually stepped away": presence-aware
  delivery + actionable answer buttons over Telegram. This is a
  live implementation of our round-98 presence-aware P2
  observation (single runtime, single channel, Windows-only) —
  validates the direction, does not overlap our cross-agent
  aggregation core.
- byyoung3/agent-email-inbox (email-yourself bridge) and a
  support-triage demo — not attention-inbox competitors.

## Verdict

Track language keeps converging on "waiting on you", now with
presence-aware delivery appearing in the wild; our cloud+local
aggregation differentiation is unchanged. No P0/P1; docs-only,
no changeset. P2 boundaries unchanged (presence-aware trigger
still not met for us).
