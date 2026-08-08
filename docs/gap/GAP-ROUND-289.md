# GAP-ROUND-289 — 竞品第二十二批扫描（纯文档）

Round 289. Driver dimension: competitor research — full
watchlist sweep + new-entrant scan, first since round-277.

## Watchlist deltas (since round-277)

- **kookr** (kookr-ai/kookr) — steady cadence continues:
  pipelineStarvation counters in `kookr status`, rejection of
  cloud-metadata/link-local peer URLs pre-fetch (SSRF face
  again), plan-quota gate tunable. Still no cloud-agent lane.
- **ccmux** (epilande/ccmux) — v1.3.0 shipped (tagline/README
  refresh, relay-skill trigger phrasing broadened). Post-release
  polish only; still tmux-bound, no cloud.
- **coslash** (centauri-ai/coslash) — commit-source work
  continues (amend detection, heredoc/stdin handling). Local
  only.
- **kelpie** (misty-step/kelpie) — desktop app iteration:
  keyboard navigation across agents, thinking-level icons,
  auto-reinstall on commit. herdr-ecosystem, single-user.
- **claude-dispatcher** (Innovology/claude-dispatcher) — still
  the most active local rival: post-Cockpit-v3 it added
  per-model-family usage split, cockpit repo→product assignment,
  README fixture screenshots. Claude-only tmux cockpit.
- **claude-notify** (oleg-vasilyev/claude-notify) — post-Phase-4
  hardening: question text kept machine-side, turn-state honesty
  fixes, conventions tooling. Single-runtime Telegram lane.
- **herdr** (herdrdev/herdr) — runtime keeps thickening: all
  agent integrations on Windows, per-pane right-click routing,
  pane bell forwarding. Ecosystem attention/remote surface
  (herdr-remote, herdr-reviewr) also active.
- **agentfleet** (beknazar/agentfleet) — fixes from its first
  real cloud-machine provision; no new push since round-277.
- **trail-boss** (jedarden/trail-boss) — daemon now packaged as
  a systemd user service (ADR-1), `status` distinguishes
  daemon-unreachable from queue-empty, license added. The
  named-watch "single-pane attention router" is maturing its
  daemon story; still local interactive agents only.
- **jind-ai** (takaaki-s/jind-ai) — fast early cadence:
  send-to-blocked-session landed, debug-log observability. tmux
  TUI, ccmux quadrant.

## New entrants

- **ryu-approvals** (amajorai/ryu-approvals, mirror pushed
  2026-08-08) — "approval inbox" where agent-proposed actions
  wait for accept/reject. Approval-gating for a single agent
  framework (Ryu), not cross-agent attention aggregation;
  archive-level note, no watch.
- Otherwise the four-query sweep returns only known repos (we
  rank first on two queries); agent-inbox (round-277 entrant)
  is in security-hardening mode.

## Verdict

Differentiation unchanged: no competitor aggregates local CLI +
cloud agents behind one attention inbox. trail-boss's systemd
daemon packaging is the notable movement — keep named watch. No
P0/P1; docs-only, no changeset.
