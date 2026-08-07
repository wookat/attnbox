# GAP-ROUND-172 — 移动端 Lighthouse 性能复测（纯文档）

Round 172. Driver dimension: performance re-test — inbox mobile
Lighthouse at the grown live scale (first since round-152, now
~3,130 sessions).

## Evidence (Lighthouse 12, mobile emulation, live daemon)

| Run | perf | TBT | LCP |
|---|---|---|---|
| 1 | 94 | 59 ms | 2.37 s |
| 2 | 94 | 0 ms | 2.40 s |
| 3 | 94 | 0 ms | 2.40 s |

Median perf **94 / TBT ≤59 ms** — identical to round-152 (94,
0–10 ms) despite +60 sessions; far from both virtualization triggers
(perf <70, TBT >600 ms reproducible). Slim SSE gain fully holds.

Method note: the environment's `google-chrome` shim routes URLs to
the CDP browser and cannot be launched by Lighthouse; pointed
`CHROME_PATH` at the Playwright chromium binary
(`~/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`).

## Verdict

Performance stable at grown scale; virtualization stays deferred.
No P0/P1; docs-only, no changeset.
