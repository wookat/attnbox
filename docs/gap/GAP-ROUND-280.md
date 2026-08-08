# GAP-ROUND-280 — 文档新鲜度走查（纯文档）

Round 280. Driver dimension: documentation freshness —
README / five site pages / LIMITS / MATURITY checked against
rounds 267–279 evidence, first since round-266.

## Findings

- **README** — no drift: capability claims all still hold on
  v0.4.8; no behavior changed since round-266 (rounds 267–279
  were docs-only audit rounds).
- **Site (quickstart / inbox / hooks / doctor / limits)** — no
  drift; no rebuild needed.
- **docs/LIMITS.md** — no drift: per-source confidence and
  operational boundaries unchanged.
- **docs/MATURITY.md** — the only drift: evidence rows were
  stale at round-266. Refreshed to rounds 267–279 facts:
  security sweeps now include round-275, a11y audits round-274,
  performance row moved to round-270 (perf 94 @3,404, TBT
  ≤33 ms) + round-268 soak (RSS 103–148 MB), real-world
  validation rows extended with rounds 272 (hooks four-state),
  275 (webhook), 279 (local collectors), 276 (offline/SSE), and
  the live-org scale updated to ~3,415 sessions.

## Verdict

Single stale-evidence drift fixed in MATURITY; everything else
current. No P0/P1; docs-only, no changeset.
