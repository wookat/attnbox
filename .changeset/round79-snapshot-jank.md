---
"attnbox": patch
---

Web inbox: SSE snapshots are no longer re-processed when byte-identical, and the offline-snapshot localStorage write happens on idle instead of synchronously on every message — at thousands of sessions the ~1 MB write was blocking the main thread (mobile Lighthouse perf 68 → 84).
