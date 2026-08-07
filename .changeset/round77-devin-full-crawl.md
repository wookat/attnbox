---
"attnbox-collectors": patch
---

The Devin collector now crawls the session backlog to exhaustion (parallel batches of 10 pages, hard safety cap 10,000 sessions) instead of stopping at 1,000 — a session blocked deep in a large org's backlog is still waiting on the user and no longer goes unreported. Deep pages keep their 30 s re-crawl cache.
