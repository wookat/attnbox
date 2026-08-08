# GAP-ROUND-285 — 移动端 Lighthouse 性能复测（纯文档）

Round 285. Driver dimension: performance re-test — inbox mobile
Lighthouse at 3,449 sessions (largest scale yet), first since
round-270. Verifies the slim-SSE gain holds and measures
distance to the virtualization trigger (perf <70 or reproducible
TBT >600 ms).

## Evidence (v0.4.8, live daemon @3,449 sessions, five runs)

```text
run 1: perf 94 · TBT 43 ms · LCP 2358 ms
run 2: perf 93 · TBT  0 ms · LCP 2553 ms
run 3: perf 94 · TBT  0 ms · LCP 2561 ms
run 4: perf 94 · TBT  0 ms · LCP 2405 ms
run 5: perf 94 · TBT  0 ms · LCP 2413 ms
```

Median perf 94, TBT ≤43 ms — level with the eight prior rounds
(152/172/189/201/227/239/255/270) despite ~45 more sessions than
round-270. Far from both trigger lines; virtualization stays
shelved. Probe daemon killed via listener PID, port clear, JSON
reports and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
