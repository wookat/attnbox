# GAP-ROUND-125 — 3k 规模移动端性能触发条件命中：slim SSE（P1）

Round 125. Driver dimension: performance re-test (first since
round-106; scale now 2,980+ sessions).

## Evidence

- Trigger check (round-106 pre-registered: reproducible mobile perf
  <70 or TBT >600 ms): six Lighthouse mobile runs on a quiet machine
  all hit it — perf 59–77, TBT 774–1,652 ms (round-106 median was 86).
- Root cause (CDP 4× CPU profile + longtask observer): the ~963 KB
  snapshot (2,909 of 2,979 items are `done`) is JSON-parsed and fully
  re-rendered on page load *and* on every SSE broadcast; each pass is a
  ~370 ms main-thread task at 4×. The eager localStorage snapshot
  restore added a second ~1 MB parse on the load path.
- Fix (the promoted P2 "payload 瘦身"):
  - daemon: `/api/events?slim=1` omits done items from every event
    (summary stays full, `slim: true` marks the payload); `/api/items`
    stays full. Non-slim SSE clients are unaffected.
  - web: subscribes slim; lazily fetches done items from `/api/items`
    the first time a view needs them (Done tab / search / grouped /
    finished expander), invalidating when `summary.total - items.length`
    drifts; expander label counts hidden done items. Offline cached
    snapshot restore is deferred ~1.2 s so the live snapshot wins the
    startup path.
- Post-fix, same rig: perf 94/93/94, TBT 22/30/25 ms.
- Live walkthrough at 2,983 sessions: summary counts correct, Done tab
  renders 2,920 finished, expander shows/expands 2,920 → full 2,983,
  ack/notify semantics untouched (waiting items always in slim payload).
- Gates: lint/typecheck/build green, 98 tests (new daemon slim test).

## Compatibility

Old daemon + new web: `?slim=1` is ignored, payload has no `slim` flag,
web falls back to full-payload behavior. New daemon + old web: unchanged
full payload. Changeset: daemon minor + attnbox patch.
