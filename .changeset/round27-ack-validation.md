---
"attnbox-daemon": patch
---

`POST /api/ack` now rejects oversized bodies (413, 64 KiB cap), non-timestamp `at` values (400), and ids not present in the current snapshot (404) — arbitrary local input can no longer grow `~/.attnbox/acked.json` without bound. Un-acking (`at: null`) still works for vanished ids so stale entries remain removable.
