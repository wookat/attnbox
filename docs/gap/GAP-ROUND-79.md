# GAP-ROUND-79 — 3k 规模移动端性能回归：perf 94→68（P1），修复后 84

Round 79. Driver dimension: frontend visual/performance analysis —
round-78's desktop numbers looked fine, but Lighthouse's throttled
mobile profile at the new 2,854-session scale told a different story.

## Found (P1)

Lighthouse (mobile simulation) on the real inbox: **perf 68** (was 94
at 1,006 sessions), LCP 4.5 s, TBT 540 ms. Long-task trace pinned it:
every SSE snapshot triggered `JSON.parse` (~1 MB) + full re-render +
a **synchronous 1 MB `localStorage.setItem`** on the main thread —
two ~320 ms long tasks during the trace, one per snapshot message.

## Fix

- Skip processing byte-identical SSE snapshots (`raw === lastRaw`).
- Move snapshot persistence off the critical path:
  `requestIdleCallback` (2 s timeout fallback), coalescing bursts to
  one write.

Re-measured: **perf 84**, LCP 3.3 s, TBT 290 ms, a11y 100, CLS 0.066.
Offline-snapshot behavior verified intact (851 KB / 2,855 items
persisted after idle; round-45 reopen path unaffected).

## Remaining (P2, documented)

The residual ~300 ms task is the unavoidable first parse+render of a
1 MB snapshot. Getting mobile perf back to 90+ needs SSE delta events
or list virtualization — same P2 as the round-64 ledger entry, same
trigger (external `/api/events` consumer or payload past ~1 MB gzip).

94 tests green. attnbox patch changeset.
