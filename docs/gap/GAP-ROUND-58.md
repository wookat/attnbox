# GAP-ROUND-58 — Devin 会话列表分页：截断漏报 waiting（P0）

Round 58. Driver dimension: real testing + dogfood data analysis.

## Evidence

Dogfood showed exactly 100 Devin items — suspicious round number. Probing
the API directly: `GET /sessions?limit=100&offset=100..400` kept returning
full pages; the org has 1,000+ sessions. Beyond page 1 the probe found
**blocked (= waiting) sessions at offset 300 and 400** plus working ones —
i.e. the product was silently missing sessions that are waiting on the
user, which is the entire point of the product. Classification: P0
(correctness of the core promise).

## Fix

`DevinCollector.collect` now paginates:

- page 0 every cycle (fresh sessions are what change);
- deeper pages crawled up to `MAX_SESSION_PAGES = 10` (≤ 1,000 sessions,
  matching the round-37 tested UI scale) and **cached for
  `DEEP_REFRESH_MS = 30 s`** — old sessions change rarely, and re-crawling
  10 pages every 3 s cycle would be ~220 req/min against the API;
- fail-soft mid-crawl: a failed deep page keeps everything fetched so far;
- results deduped by `session_id` (pages can shift between requests).

## Evidence after fix

Live daemon: 1,006 items (was 106), waiting 6 — **2 real waiting sessions
recovered** that were invisible before. Payload 331 KB (fine for
loopback/LAN + change-only SSE). 88 tests green (3 new: pagination,
deep-cache reuse, mid-crawl fail-soft).

## Honest boundary

- Orgs with > 1,000 sessions still truncate at the cap; the cap matches
  our tested UI scale and is a named constant to revisit.
- Deep pages are up to 30 s staler than page 0 — an explicit trade to
  keep API traffic bounded (~30 req/min worst case).
