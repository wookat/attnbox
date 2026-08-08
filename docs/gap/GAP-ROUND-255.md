# GAP-ROUND-255 — 移动端 Lighthouse 性能复测（纯文档）

Round 255. Driver dimension: performance re-test — inbox mobile
Lighthouse at 3,371 sessions, first since round-239.

## Evidence (v0.4.8, live daemon @3,371 sessions, headless
Chromium, mobile emulation)

```text
run 1: perf 94 · TBT 0 ms · LCP 2403 ms
run 2: perf 94 · TBT 2 ms · LCP 2413 ms
run 3: perf 94 · TBT 0 ms · LCP 2408 ms
run 4: perf 94 · TBT 0 ms · LCP 2412 ms
run 5: perf 94 · TBT 0 ms · LCP 2413 ms
```

Perf 94 across all five runs, TBT 0–2 ms at 3,371 sessions —
level with rounds 152/172/189/201/227/239. The slim-SSE gain
holds as the org keeps growing; far from the virtualization
trigger (perf <70 or reproducible TBT >600 ms), so
virtualization stays untriggered. Probe daemon killed via
listener PID, port 4932 verified clear, reports and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
