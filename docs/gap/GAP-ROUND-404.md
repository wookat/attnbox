# GAP-ROUND-404 — 竞品第三十三批扫描（纯文档）

Round 404. Driver dimension: competitor research, first since
round-393 — full named-watch sweep (11 repos) + three-vector
new-entrant scan.

## Named watch (activity since 2026-08-07)

- **claude-dispatcher** (★9) — again the most active local
  rival: Products lens with honest counts/visible cursor,
  build-version nag, model-family usage split, repo→product
  assignment from the cockpit. Still Claude-only tmux
  cockpit, no cloud aggregation.
- **jind-ai** (★1) — heavy pane-identity/adapter-setup-cache
  refactor stream (PRs 183–187). tmux TUI, ccmux quadrant.
- **kookr** (★3) — high-velocity as ever: starvation
  counters, peer-URL SSRF rejection, quota headroom tuning,
  Escape/focus-trap fixes. Local-only.
- **ccmux** (★119) — v1.3.0 release wrap-up (docs/tagline
  refresh, relay-skill trigger broadening, OpenCode
  float-second marker fix). Local/tmux.
- **agentfleet** (★0) — "report what a machine is actually
  doing, not what a timer implies" — real machine-state
  reporting after first true cloud provision. Multi-machine
  local plane, no attention semantics.
- **kelpie** (★1) — desktop polish burst: keyboard nav
  across agents, thinking-level icons, focus rings. herdr
  ecosystem, single-operator.
- **claude-notify** (★0) — Phase 4 wrap: answer from
  Telegram, question text stays on the machine. Claude-only.
- **agent-inbox** (★1) — quiet since the 8/7 hardening wave
  (trusted-origin viewer mutations, network boundary,
  dependency remediation). Still purely local.
- **trail-boss** (★0) — only a license file added.
- **coslash** (★3) — small commit-detection fixes on v0.0.1.
- **ryu-approvals** (★0) — mirror sync only. Framework-
  specific approvals, not an aggregator.

## New entrants (three-vector scan)

Only one new item worth archiving: **Revolper/HumanLoop**
(★0, created 08-06) — "One inbox for agent approvals —
approve in the IDE or from anywhere": Claude + Cursor alerts
into one Flutter web/mobile/desktop inbox with remote
approve/reject and hook-gated auto-continue. Language
overlaps our remote-approval P2 observation and the mobile
surface, but it is approvals-only (no status model, no
waiting-reason across agents, no cloud-agent aggregation).
Archive; promote to named watch if it grows a status/waiting
surface. Others in the scan are unrelated (email triage,
desktop pets) or already archived (herdr-island, nMn,
duty-on).

## Verdict

Differentiation unchanged: no rival aggregates local CLI +
cloud agents with waiting reasons and act-in-place. No
P0/P1; docs-only, no changeset.
