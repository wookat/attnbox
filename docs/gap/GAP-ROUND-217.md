# GAP-ROUND-217 — 文档新鲜度走查（纯文档）

Round 217. Driver dimension: docs freshness — README / website
(five pages) / LIMITS / MATURITY checked against rounds 206–216
evidence (first since round-205).

## Findings

- **README / website / LIMITS**: no drift. No behavior, boundary,
  or version has changed since round-205 (all rounds since were
  docs-only); spot-checked claims (reply-write boundary, token
  gate, slim SSE boundary, version 0.4.8) still accurate. Website
  rebuild not needed.
- **MATURITY** (only stale file) refreshed to current evidence:
  - header round 205 → 217;
  - a11y re-audits +round-206; hooks negative tests +round-208;
    collectors live-fire +round-212; offline/SSE re-proof
    +round-209;
  - performance row now carries the round-214 observation honestly
    (median 85 paint-side drift, ungraded, TBT ≤160 ms) alongside
    the round-201 baseline, and soaks 203/210.

## Verdict

Single-file refresh; docs otherwise current. No P0/P1; docs-only,
no changeset.
