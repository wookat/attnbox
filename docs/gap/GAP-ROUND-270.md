# GAP-ROUND-270 — 移动端 Lighthouse 性能复测（纯文档）

Round 270. Driver dimension: performance re-test — inbox mobile
Lighthouse at 3,400+ sessions, first since round-255; verify the
slim-SSE gain holds and distance from the virtualization
trigger line.

## Evidence (v0.4.8, live daemon @3,404 sessions, mobile
emulation, five runs)

```text
run 1: perf 94 · TBT 33 ms · LCP 2350 ms
run 2: perf 94 · TBT  7 ms · LCP 2403 ms
run 3: perf 94 · TBT  1 ms · LCP 2403 ms
run 4: perf 94 · TBT  0 ms · LCP 2403 ms
run 5: perf 94 · TBT  0 ms · LCP 2404 ms
```

Perf 94 across all five runs with TBT ≤33 ms at the largest org
size yet — level with rounds 152/172/189/201/227/239/255. The
virtualization trigger (mobile perf <70 or reproducible TBT
>600 ms) remains far from met; P2 stays shelved. Probe daemon
killed via listener PID, port clear, reports and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
