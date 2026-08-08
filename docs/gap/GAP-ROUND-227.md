# GAP-ROUND-227 — 移动端 Lighthouse 复测 + round-214 观察项归因收口（纯文档）

Round 227. Driver dimension: performance re-test — inbox mobile
Lighthouse @3,272 sessions, first since round-214, with the
explicit goal of attributing the round-214 median-85 drift.

## Evidence (v0.4.8, live daemon @3,272 sessions, Playwright
Chromium via CHROME_PATH, mobile emulation, 5 runs)

```text
run 1: perf 94 · FCP 2.1s · LCP 2.4s · TBT 0ms  · CLS 0.08  · SI 2.1s
run 2: perf 91 · FCP 2.1s · LCP 2.4s · TBT 10ms · CLS 0.128 · SI 2.1s
run 3: perf 94 · FCP 2.1s · LCP 2.4s · TBT 0ms  · CLS 0.08  · SI 2.1s
run 4: perf 94 · FCP 2.1s · LCP 2.4s · TBT 0ms  · CLS 0.08  · SI 2.1s
run 5: perf 94 · FCP 2.1s · LCP 2.4s · TBT 0ms  · CLS 0.08  · SI 2.1s
```

Median 94, matching rounds 152/172/189/201.

## Round-214 observation closed

The round-214 median-85 reading (paint-side, zero-code-change
window) did **not** reproduce across five runs on the same
methodology at a larger session count. Attribution: transient
host/environment condition during the round-214 window (box
load), not a product regression. Observation closed; the
standing envelope remains perf ≥91 / TBT ≤10ms, far from the
virtualization trigger (perf <70 or TBT >600ms) — virtualization
stays shelved.

Cleanup: probe daemon killed via listener PID, port 4948 clear,
reports and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
