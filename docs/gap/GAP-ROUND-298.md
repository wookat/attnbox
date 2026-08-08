# GAP-ROUND-298 — 竞品第二十三批扫描（纯文档）

Round 298. Driver dimension: competitor research — full
watchlist sweep + new-entrant scan, first since round-289.

## Watchlist (commits since 2026-08-01)

- **kookr-ai/kookr** — steady hardening: pipeline-starvation
  counters in `kookr status`, SSRF guard on collaboration peer
  URLs, tunable quota-headroom gate, dialog focus-trap fixes.
  Cadence high but direction unchanged (single-runtime fleet).
- **epilande/ccmux** — post-v1.3.0 polish only (README/tagline,
  relay-skill trigger phrasing). Still tmux-bound, no cloud.
- **centauri-ai/coslash** — commit-source/amend-detection
  refinement, v0.0.1 README. Early local tooling.
- **misty-step/kelpie** — desktop iteration continues (keyboard
  nav across agents, thinking-level icons, VISION.md). Attention
  language present, herdr-adjacent, no cloud aggregation.
- **Innovology/claude-dispatcher** — remains the most active
  local rival: Cockpit v3 (command queue, no mock data),
  repo-to-product assignment from the cockpit, per-model usage
  split. Still Claude-only, no cross-vendor inbox.
- **oleg-vasilyev/claude-notify** — Phase 4 shipped ("answer
  Claude's questions from Telegram") plus honest-turn-state
  fixes ("stop lying about the turn"). The remote-answer wild
  implementation matures, still single-runtime notify.
- **herdrdev/herdr** — Windows all-agent integrations, per-pane
  right-click routing, terminal-bell forwarding. Ecosystem
  thickens.
- **beknazar/agentfleet** — first real cloud-machine end-to-end
  provision fixes landed; "shows you which agents are waiting"
  copy persists. Watch continues.
- **jedarden/trail-boss** — license added, systemd user-service
  ADR done, daemon-unreachable vs queue-empty status
  distinction. Named-watch attention router keeps hardening its
  daemon face; still local-only.
- **takaaki-s/jind-ai** — send-to-blocked-session feature merged
  plus debug-log observability. tmux TUI quadrant.

## New entrants (created since 2026-08-01)

- **kay-ws/herdr-island** — herdr plugin: "Find the agents that
  are waiting on you", surfaces the stop reason (permission /
  AskUserQuestion) in the Agents panel and filters to waiting
  only. Direct waiting-reason language inside the herdr
  ecosystem — archived as an ecosystem watch item (plugin, not a
  standalone aggregator; herdr already on the watchlist).
- **ChEnylnti/YuruPager** — "remote notifications, approvals,
  and supervision for local AI coding agents"; no README/code
  surface yet (0 stars, empty). Archive, re-check next sweep.
- **kapvadym/claude-mission-control** — local-first Next.js
  dashboard for one autonomous Claude agent with approvals;
  single-runtime control panel, not an aggregator. Archive.
- **marine841023/duty-on** — Live2D desktop pet mirroring
  Trae/Qoder agent state, nudges when an agent waits. Novelty
  notifier for a different agent family. Archive.

## Verdict

Differentiation unchanged: no entrant aggregates local CLI +
cloud agents into one attention inbox with vendor-authoritative
cloud status. herdr's ecosystem now has a dedicated
"waiting-on-you + why" plugin (island) — the waiting-reason
framing keeps spreading, which validates the category; herdr
watch item annotated. No P0/P1; docs-only, no changeset.
