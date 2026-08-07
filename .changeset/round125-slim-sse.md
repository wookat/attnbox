---
"attnbox-daemon": minor
"attnbox": patch
---

Slim SSE payloads: the web inbox now subscribes with `/api/events?slim=1`, which omits done sessions (97% of a large org's ~1 MB snapshot) from every event while keeping the full summary counts. Done sessions are fetched lazily from `/api/items` the first time a view needs them (Done tab, search, grouped view, or the finished expander). The cached offline snapshot is also restored lazily — only when the live SSE snapshot hasn't arrived shortly after load. At ~3,000 sessions this takes the mobile inbox from Lighthouse perf ~65 / TBT >1,100 ms back to ~94 / ~25 ms.
