# GAP-ROUND-350 — 竞品第二十八批扫描（纯文档）

Round 350. Driver dimension: competitor watch, first since
round-338. Real GitHub API evidence (repo metadata + last 5
commits per named watch, plus three-vector new-entrant search
restricted to repos created after 2026-08-01).

## Named watchlist

- **shariqh/agent-inbox** — most notable mover this window:
  within days of its round-338 debut it shipped a security
  hardening burst (trusted-origin requirement for viewer
  mutations, viewer network-boundary hardening, dependency
  advisory remediation, startup migration serialization) plus a
  public landing page refresh. Maturing fast, but still
  local-only (MCP + SQLite + viewer), no cloud/Devin
  aggregation.
- **Innovology/claude-dispatcher** — Cockpit v3 tail work:
  usage split by model family, repo→product assignment from the
  cockpit, README screenshots from a fictional fixture. Still
  the most active local rival; Claude-only.
- **kookr-ai/kookr** — high-velocity cadence continues
  (pipelineStarvation counters in status, cloud-metadata/
  link-local peer-URL rejection — SSRF hardening line continues,
  operator-tunable quotaHeadroomThreshold, Escape/focus-trap on
  Sweep dialog). No cloud side.
- **epilande/ccmux** — v1.3.0 released with docs polish and a
  broadened relay-skill trigger; 119★, largest local rival by
  stars. tmux-bound.
- **beknazar/agentfleet** — "report what a machine is actually
  doing, not what a timer implies" + fixes from the first real
  cloud provision. Multi-machine remote fleet philosophy
  deepening; nearest multi-machine local-face rival.
- **jedarden/trail-boss**, **oleg-vasilyev/claude-notify**,
  **misty-step/kelpie**, **takaaki-s/jind-ai**,
  **centauri-ai/coslash** — routine iteration, no positioning
  change (coslash still "attention layer" language, local-only).

## New entrants (created after 2026-08-01)

Three-vector search: no new direct competitor. Only
tangential archives: support-triage-agent (email support
triage), duty-on (already archived round-298), nMn (already
archived round-307), prioraAI (generic message-priority
router, not coding-agent facing).

## Verdict

Differentiation unchanged — no rival aggregates local CLI +
cloud (Devin) attention. agent-inbox's fast hardening cadence
noted for continued named watch. No P0/P1; docs-only, no
changeset.
