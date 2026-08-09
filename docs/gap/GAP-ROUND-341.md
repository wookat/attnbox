# GAP-ROUND-341 — 文档新鲜度走查（纯文档）

Round 341. Driver dimension: documentation freshness — README,
website (five pages), LIMITS, MATURITY checked against rounds
331–340 evidence, first since round-330.

## Findings

- README: no drift (no stale version/feature claims).
- Website (/, /inbox/, /hooks/, /doctor/, /limits/): all 200, no
  content drift vs current behavior — no rebuild needed.
- LIMITS: boundaries still accurate (slim SSE, detail batching,
  webhook contract unchanged since round-335 evidence).
- MATURITY: **only drift** — evidence rows stale at round-330.
  Refreshed to rounds 331–340: security sweeps +335, a11y +333,
  soak scale 3,615 (+337), hooks +331, storm guards +335,
  collectors +340, offline/SSE +334, live scale ~3,615.

## Verdict

Single drift fixed in `docs/MATURITY.md`. No P0/P1; docs-only,
no changeset.
