# GAP-ROUND-385 — 文档新鲜度走查（纯文档）

Round 385. Driver dimension: documentation freshness walk
(README / site five pages / LIMITS / MATURITY against rounds
374–384 evidence), first since round-374.

## Findings

- README: no drift — feature surface unchanged since v0.4.8
  (round-125 slim SSE); webhook/host/hooks narratives current.
- Site (quickstart / inbox / hooks / doctor / limits): no
  drift; no product behavior change since the round-127 sync,
  so no rebuild needed.
- `docs/LIMITS.md`: no drift — per-source confidence and
  boundaries still match implementation.
- `docs/MATURITY.md`: only stale surface. Evidence rows
  refreshed to rounds 374–384 reality: security sweeps +379,
  a11y audits +377, hooks negative tests +376, storm guards
  +379, collectors +384, offline/SSE +378, soak envelope
  extended to @3,740 / 96–153 MB (round-381), live scale
  ~3,740, header stamp round 385.

## Verdict

Single drift (MATURITY evidence rows) fixed in this PR. No
P0/P1; docs-only, no changeset.
