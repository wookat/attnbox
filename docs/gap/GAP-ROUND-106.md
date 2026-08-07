# GAP-ROUND-106 — 收件箱移动端性能复测（纯文档）

Round 106. Driver dimension: performance — the inbox app's mobile
Lighthouse had not been re-run since round-87 (perf 84 at ~2.85k
sessions); live scale is now 2.9k+.

## Measured (local daemon, live data, 3 runs, shared desktop Chrome)

| Run | perf | TBT | LCP | CLS |
|---|---|---|---|---|
| 1 | 79 | 440 ms | 3.2 s | 0.066 |
| 2 | 86 | 400 ms | 2.2 s | — |
| 3 | 86 | 420 ms | 2.1 s | — |

a11y 100, best-practices 100.

## Read

Median perf 86 vs round-87's 84 — no regression; round-79's fix is
holding as the payload grows. TBT sits at ~400–440 ms (was ~290 ms at
2.85k), tracking first-snapshot parse/render cost, which is the
already-deferred P2. Escalation trigger recorded: perf < 70 or
TBT > 600 ms on a repeatable run → promote the payload-slimming /
virtualization P2s.

## Verdict

No P0/P1. Docs-only; no changeset.
