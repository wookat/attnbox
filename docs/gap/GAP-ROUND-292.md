# GAP-ROUND-292 — 文档新鲜度走查（纯文档）

Round 292. Driver dimension: documentation freshness — README /
site five pages / LIMITS / MATURITY checked against rounds
281–291 evidence, first since round-280.

## Findings

- `README.md`, site pages (quickstart/inbox/hooks/doctor/limits)
  and `docs/LIMITS.md`: no drift — no version numbers, scale
  figures, or behavior claims contradicted by rounds 281–291
  evidence; no site rebuild needed.
- `docs/MATURITY.md`: the only drift — evidence rows were stale
  at round 280. Refreshed:
  - header → round 292;
  - security negative sweeps + round-286;
  - a11y re-audits + round-284;
  - performance row → round-285 (perf median 94, TBT ≤43 ms
    @3,449 — largest scale to date) and soak list + round-281
    (@3,430);
  - real-world validation rows + rounds 283 (hooks), 286
    (webhook storm guard), 291 (collectors), 287 (offline/SSE);
    live scale → ~3,450 sessions.

## Verdict

No P0/P1; docs-only, no changeset.
