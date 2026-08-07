# GAP-ROUND-78 — 2,851 会话规模复测：round-77 全量爬取后无回归（纯文档）

Round 78. Driver dimension: real testing — round-77 tripled the item
count (1,006 → 2,851); GAP-ROUND-77 queued a re-benchmark at 3k scale.

## Measured (real inbox, real 2,851 sessions)

- First paint: 93 ms to interactive shell; default view 58 cards
  (finished collapsed — "Show 2794 finished sessions").
- Expand all 2,851 cards: 507 ms (was ~300 ms at 1,006 — sublinear,
  fine for an explicit action).
- Search across 2,851 items (CJK term): ~456 ms including typing,
  correct 6-item result.
- API payload: 921 KB raw / 203 KB gzip per snapshot (was 40 KB at
  ~106 sessions, ~186 KB/min per tab at 1,006). SSE remains gzip'd;
  at ~3k sessions a tab now draws roughly 3× round-64's measured
  budget. Still bounded; delta events stay the documented P2 with the
  same trigger (an external `/api/events` consumer or payloads
  growing past ~1 MB gzip).
- `ls --waiting`: 2.4 s (round-77 measurement, unchanged).

## Verdict

No new P0/P1. The finished-collapse default (round-36) is what keeps
3k-scale usable — the default view stayed at 58 cards while the org
tripled. P2 ledger updated with the payload trend.

No code change; no changeset.
