# GAP-ROUND-319 — 收件箱移动端 Lighthouse 复测（纯文档）

Round 319. Driver dimension: mobile performance re-test of the
inbox at the largest scale to date, first since round-285.
Real probe daemon, Lighthouse mobile preset, Playwright
Chromium via `CHROME_PATH` (round-172 note).

## Evidence (v0.4.8, live org @3,575 sessions · 24 waiting)

Eight runs:

```text
run 1: perf 71 · TBT 293 ms · LCP 3998 ms
run 2: perf 77 · TBT 256 ms · LCP 2729 ms
run 3: perf 83 · TBT 333 ms · LCP 2739 ms
run 4: perf 81 · TBT 352 ms · LCP 2778 ms
run 5: perf 83 · TBT 327 ms · LCP 2735 ms
run 6: perf 77 · TBT 286 ms · LCP 3761 ms
run 7: perf 77 · TBT 290 ms · LCP 3779 ms
run 8: perf 75 · TBT 330 ms · LCP 3836 ms
→ median perf 77 · median TBT ~310 ms
```

Down from round-285's median 94 / TBT ≤43 ms @3,449 sessions.
Breakdown (run 8): main-thread 891 ms dominated by
Style & Layout 442 ms (paint side); Script Evaluation only
154 ms; transfer 264 KB. Same paint-side signature as the
round-214 median-85 drift that later closed as transient host
load (round-227 back to 94). Host during this window: shared VM
with long-lived Chrome/VNC and prior kswapd pressure; zero
product-code change since v0.4.8 (round-125), so no code-side
suspect exists in the merge window.

## Assessment

- Virtualization trigger line (sustained perf <70 or reproducible
  TBT >600 ms) is NOT hit — perf 71–83, TBT ≤352 ms.
- Filed as an observation item (like round-214): re-measure at
  the next performance round; if the paint-side drift persists on
  a quiet host, attribute properly before considering any P2
  action. P2 virtualization remains deferred.

Probe daemon killed, port clear, reports and logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
