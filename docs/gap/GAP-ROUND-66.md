# GAP-ROUND-66 — 文档新鲜度：rounds 63–65 漂移（纯文档轮）

Round 66. Driver dimension: docs freshness walkthrough after rounds
63–65.

## Drift found and fixed

- Site `inbox.md`: the linking section described only the round-50
  behavior; added the round-63 **PR ↗** chip (secondary PR action on
  waiting cards).
- `docs/LIMITS.md` + site `limits.md`: added the round-64 SSE wire-cost
  boundary — full-state snapshots, gzip when accepted (~186 KB/min per
  tab at 1,000 sessions), delta events deferred as P2.

## Checked, no drift

- Rounds 62/65 were visual/a11y-only (tap targets, contrast, aria
  names) — nothing user-doc-visible.
- Keyboard table, reply, notifications, grouping, doctor pages all
  still match behavior.

No package behavior change; no changeset. Site redeploy after merge.
