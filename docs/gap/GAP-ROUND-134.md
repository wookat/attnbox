# GAP-ROUND-134 — slim SSE 发布后移动端性能复测（纯文档）

Round 134. Driver dimension: performance re-test — first mobile
Lighthouse check since the round-125 fix shipped in v0.4.8 (post-fix
numbers were measured pre-release on the working tree).

## Evidence (live inbox, ~2,995 sessions, mobile emulation)

| run | perf | TBT |
| --- | --- | --- |
| 1 | 94 | 28 ms |
| 2 | 87 | 306 ms |
| 3 | 92 | 162 ms |

Median perf 92 (round-125 post-fix was 93–94); a11y 100 / bp 100 on
the full run. Run-to-run spread tracks background machine load, but
every run stays far above the pre-registered triggers (perf <70,
TBT >600 ms) — pre-fix runs were perf 59–77 / TBT 774–1,652 ms.

## Verdict

Round-125's gains hold on the published build at ~3k live sessions.
No P0/P1; virtualization stays deferred per the P2 ledger (would need
perf <70 reproducible after slim). Docs-only; no changeset.
