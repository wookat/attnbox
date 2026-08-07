# GAP-ROUND-152 — 收件箱移动端 Lighthouse 复测（纯文档）

Round 152. Driver dimension: performance re-test — first mobile
Lighthouse since round-134, at grown scale (~3,070 sessions, v0.4.8
slim build). Port cleared of stray daemons before testing
(round-150 pitfall applied).

## Evidence (3 runs, mobile preset, simulated throttling)

| Run | perf | TBT (ms) | LCP (ms) |
|---|---|---|---|
| 1 | 95 | 0 | 2,318 |
| 2 | 94 | 0 | 2,415 |
| 3 | 94 | 10 | 2,406 |

- Median perf **94** (round-134: 92) — slim SSE gains not only hold
  but improved slightly as done-share grows.
- TBT 0–10 ms — two orders of magnitude from the 600 ms trigger line.
- Virtualization stays deferred (trigger: post-slim perf <70 or
  TBT >600 ms reproducible — not remotely approached).

## Verdict

Performance excellent at grown scale. No P0/P1; docs-only, no
changeset.
