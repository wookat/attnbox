# GAP-ROUND-338 — 竞品第二十七批扫描（纯文档）

Round 338. Driver dimension: competitor research — named watchlist
full check + new-entrant scan, first since round-327. GitHub API
evidence gathered 2026-08-09.

## Named watchlist

- **claude-dispatcher (Innovology)** — still the most active local
  rival: Cockpit v3 post-polish continues (`Split usage by model
  family` 08-08, `Assign repos to products from the cockpit`,
  README screenshots from fictional fixture). Claude-only tmux
  cockpit, no cloud aggregation.
- **kookr (kookr-ai)** — high-velocity iteration continues
  (pipelineStarvation counters in status, cloud-metadata/link-local
  peer-URL rejection — SSRF hardening line continues, quota headroom
  tuning). Local attention router, no cloud agents.
- **ccmux (epilande)** — quiet post-v1.3.0 (last release 08-08 was
  v1.3.0 itself; polish commits only).
- **agentfleet (beknazar)** — "Report what a machine is actually
  doing, not what a timer implies" (08-09) + fixes from first real
  cloud provision — real-state philosophy converging with ours,
  still remote-fleet control plane not attention inbox.
- **trail-boss (jedarden)** — license added; ADR-1 systemd user
  service landed; daemon-unreachable vs empty-queue distinction.
  Slow cadence, ★0.
- **jind-ai (takaaki-s)** — active (pushed 08-09), tmux TUI,
  ccmux quadrant.
- **claude-notify (oleg-vasilyev)** — quiet since 08-07 boundary
  hardening. kelpie/herdr ecosystem: routine.
- **coslash** — "attention layer" positioning unchanged, ★3, local
  Claude-only.

## New entrants

- **shariqh/agent-inbox** (★1, created 07-16, active) — the closest
  new language match to date: "Local, cross-project, cross-tool
  attention inbox for coding agents (MCP + SQLite + viewer)".
  Electron/browser inbox where Copilot CLI + Claude Code surface
  questions/plans and the human answers in-app via MCP round-trip
  (answer-in-place for local agents — the wild implementation of our
  local remote-approval P2). Local-first, loopback-only, no cloud
  agents (no Devin/cloud aggregation), Node 24, source-first no npm.
  → archived as **named watch** (strongest local inbox-language
  overlap; differentiation intact: we aggregate cloud + local and
  ship a zero-intrusion PWA, it requires MCP wiring per host).
- Other scan results (support-triage-agent etc.): unrelated domains,
  archived without watch.

## Verdict

Differentiation unchanged: no rival aggregates local CLI + cloud
agents with waiting-reason detail. agent-inbox added to named
watchlist. No P0/P1; docs-only, no changeset.
