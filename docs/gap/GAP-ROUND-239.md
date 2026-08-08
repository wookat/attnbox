# GAP-ROUND-239 — 移动端 Lighthouse 性能复测（纯文档）

Round 239. Driver dimension: performance re-test — inbox mobile
Lighthouse at 3,300+ sessions, first since round-227.

## Evidence (v0.4.8, live daemon @~3,301 sessions, five runs)

```text
run 1: perf 94 · FCP 2.2s · LCP 2.4s · TBT 77ms · CLS 0.080 · SI 2.2s
run 2: perf 94 · FCP 2.1s · LCP 2.4s · TBT 10ms · CLS 0.080 · SI 2.1s
run 3: perf 94 · FCP 2.1s · LCP 2.4s · TBT 0ms  · CLS 0.080 · SI 2.1s
run 4: perf 94 · FCP 2.1s · LCP 2.4s · TBT 0ms  · CLS 0.080 · SI 2.1s
run 5: perf 94 · FCP 2.1s · LCP 2.4s · TBT 0ms  · CLS 0.080 · SI 2.1s
```

Median perf 94, TBT 0–77 ms — level with rounds
152/172/189/201/227 despite ~30 more sessions. Far from the
virtualization trigger (perf <70 or reproducible TBT >600 ms);
virtualization stays shelved. Probe daemon killed via listener
PID, port 4940 verified clear, logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
