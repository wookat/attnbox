# GAP-ROUND-396 — 文档新鲜度走查（纯文档）

Round 396. Driver dimension: docs freshness, first since
round-385 — README / site five pages / LIMITS / MATURITY
checked against rounds 385–395 evidence.

## Findings

- README, site pages (quickstart/inbox/hooks/doctor/limits),
  `docs/LIMITS.md`: no drift — no behavior changed in rounds
  385–395 (all docs-only); version reference 0.4.8 current.
  No site rebuild needed.
- Only drift: `docs/MATURITY.md` evidence rows stale at
  round-385. Refreshed to rounds 385–395 reality:
  - header stamp → round 396;
  - security sweeps +390, axe audits +388, hooks negative
    tests +387, storm-guard live-fire +390, collectors
    live-fire +395, offline/SSE re-proofs +389;
  - live scale ~3,740 → ~3,760; soak series +@3,763
    (round-392), RSS envelope 96–153 → 96–156 MB.

## Verdict

Single stale-evidence drift fixed; everything else current.
No P0/P1; docs-only, no changeset.
