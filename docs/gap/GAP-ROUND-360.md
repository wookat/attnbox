# GAP-ROUND-360 — 竞品第二十九批扫描（纯文档）

Round 360. Driver dimension: competitor watch, first since
round-350. Real GitHub API evidence (repo metadata + last 5
commits per named watch, plus three-vector new-entrant search
restricted to repos created after 2026-08-04). Tail-end
per-commit queries for three quiet watches hit the unauth API
rate limit; their freshness was still confirmed via search
metadata (pushed_at).

## Named watchlist

- **shariqh/agent-inbox** — quiet since its 2026-08-07
  hardening burst (trusted-origin viewer mutations, network
  boundary, dependency advisories, startup migration
  serialization, landing refresh). Still local-only
  (MCP + SQLite + viewer), no cloud/Devin aggregation.
- **claude-dispatcher** (9★) — still the most active local
  rival: build-version nag, per-model-family usage split,
  cockpit repo→product assignment on top of Cockpit v3.
- **kookr** (3★) — high-velocity cadence continues
  (pipelineStarvation counters, SSRF-adjacent peer-URL
  rejection, quota headroom tuning).
- **ccmux** (119★) — v1.3.0 released; docs/tagline refresh,
  relay-skill trigger broadening. Still tmux/local.
- **trail-boss** — ADR-1 landed: daemon as systemd user
  service; license added.
- **jind-ai** — plugin identity plumbing refactors; tmux TUI
  lane unchanged.
- **agentfleet** — first real cloud-machine end-to-end
  provision fixed up; real machine-state reporting ("what a
  machine is actually doing, not what a timer implies").
- **claude-notify / kelpie / coslash** — pushed 08-06/08-07/
  08-08 respectively (search metadata); no lane change
  signals.

## New entrants

Three-vector search (created >2026-08-04): only a support-email
triage agent (different domain) — no new direct entrant.

## Verdict

Differentiation unchanged — no rival aggregates local CLI +
cloud (Devin) attention. No P0/P1; docs-only, no changeset.
