# GAP-ROUND-327 — 竞品第二十六批扫描（纯文档）

Round 327. Driver dimension: competitor research — named
watchlist re-check plus new-entrant scan, first since round-318.
Authenticated `gh api` repo/commit lookups and three-vector
GitHub search.

## Watchlist findings

- **claude-dispatcher** (Innovology, ★9, pushed 08-08): steady
  post-Cockpit-v3 polish — usage split by model family, cockpit
  repo→product assignment. Still Claude-only tmux; remains the
  most active local rival.
- **ccmux** (epilande, ★118, 08-08): v1.3.0 wrap-up — tagline
  refresh, relay-skill trigger phrasing broadened. Docs-phase.
- **kookr** (kookr-ai, 08-07): high-velocity iteration
  continues — `pipelineStarvation` counters in status,
  cloud-metadata/link-local peer-URL rejection (SSRF hardening
  line continues), quota-headroom launch gate. Still no cloud
  aggregation.
- **herdr** (★26k, 08-09): core runtime/graphics work (pane
  frame streaming, configurable borders) — no attention-surface
  change this window. **kelpie**: desktop app polish
  (thinking-level icons, auto-reinstall rule).
- **agentfleet** (beknazar, 08-09): follow-through on real cloud
  provision — "report what a machine is actually doing, not what
  a timer implies" (honest machine-state line, same philosophy as
  our vendor-authoritative rule).
- **trail-boss** (jedarden, 08-08): license added; systemd
  user-service ADR implemented; daemon-unreachable vs empty-queue
  status distinction. Slow but converging on daemon ergonomics.
- **coslash** (centauri-ai, 08-08): commit-detection edge fixes
  after the v0.0.1 README. Local-only.
- **jind-ai relocated**: canonical repo is now
  `takaaki-s/jind-ai` (★1, pushed 08-09) — "Ten agent sessions,
  one screen", tmux TUI over Claude Code/Codex/opencode; env
  plumbing fixes. Watchlist entry corrected (previous
  BurkeHolland pointer 404s).
- **oleg-vasilyev/claude-notify** (08-07): Phase 4 landed —
  answer Claude's questions from Telegram; latest commits scope
  what a remote answerer may do ("draw the limits"). Single
  runtime; archived-watch stays.

## New entrants

Three-vector scan ("waiting on you" / "attention inbox" /
"blocked on you", fresh windows): no new independent entrants —
hits are the already-tracked agentfleet and claude-notify (and
attnbox itself).

## Assessment

The "which agent is waiting on you" language keeps consolidating
across the local quadrant, but every rival remains single-machine
or single-runtime; unified local+cloud aggregation with
zero-intrusion discovery is still uncontested. No product change
warranted.

## Verdict

No P0/P1; docs-only, no changeset.
