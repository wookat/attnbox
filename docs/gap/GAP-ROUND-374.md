# GAP-ROUND-374 — 文档新鲜度走查（纯文档）

Round 374. Driver dimension: docs freshness audit
(README / site five pages / LIMITS / MATURITY) against rounds
363–373 evidence, first since round-363.

## Findings

- README: no drift (no round-scoped claims stale).
- Site (quickstart / inbox / hooks / doctor / limits): no
  drift — no behavior changed since round-363 (all rounds
  docs-only); no rebuild needed.
- `docs/LIMITS.md`: no drift.
- `docs/MATURITY.md`: the only drift — evidence rows stale at
  round-363. Refreshed to rounds 363–373 evidence:
  - header stamp → round 374; live scale → ~3,700 sessions;
  - security sweeps + storm-guard rounds += 368;
  - a11y re-audits += 366; hooks negative tests += 365;
  - soak series += @3,700 (round-370);
  - collectors live-fire += 373; offline/SSE += 367.

## Verdict

Single drift fixed in MATURITY. No P0/P1; docs-only, no
changeset.
