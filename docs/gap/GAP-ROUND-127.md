# GAP-ROUND-127 — 官网跟上 slim SSE + 竞品每轮必查（纯文档）

Round 127. Driver dimension: docs freshness (site vs round-125
slim SSE) plus the kookr every-round competitor check.

## Docs drift found and fixed

- Site `limits.md` still said "full-state SSE snapshots" with no
  mention of the v0.4.8 slim subscription; added the `?slim=1`
  behavior and the offline consequence (Done tab / finished-session
  search need the daemon reachable).
- Site `inbox.md` phone-flow offline paragraph implied the cached
  snapshot covers everything; added the active-sessions-only boundary.
- Other pages (index, doctor, hooks): no drift — none describe the SSE
  payload shape.

## Competitor check (every-round kookr watch, round-115 alert)

- **kookr**: still merging many times a day (#2178 by now — capacity
  verdicts, FAA ack-path reaper, starvation-scout cooldown, pty fd
  fixes). All fleet-orchestration internals; still no cloud-agent
  aggregation. Watch continues.
- **kelpie** (`dkomlen/kelpie`): repository now returns 404 — deleted
  or made private. The closest philosophy-twin (read-only attention
  board) has left the public field.
- **ccmux**: TUI dialog styling/hints only; no attention-surface
  movement.
- **coslash**: minor push Aug 7, nothing user-facing new.

## Verdict

No P0/P1. Site rebuild needed after merge (Cloudflare Pages).
Docs-only; no changeset.
