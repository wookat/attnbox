# GAP-ROUND-111 — dogfood 数据审计发现 detail 截断（P1 修复）

Round 111. Driver dimension: data analysis — waiting/ack health
re-audit (first since round-97, live scale now 2,941 sessions).

## Found (P1)

21 waiting sessions, all fresh (< 25 min) with URLs — but only 10
carried `detail` ("what is it asking"). Root cause: round-20's
`MAX_DETAIL_FETCHES_PER_CYCLE = 10` assumed later cycles catch up,
which holds for the daemon but not for one-shot `attnbox ls` — at
today's scale (> 10 blocked), half the waiting list permanently
shipped without its question. Verified against the live API that the
capped sessions do have `devin_message`s.

## Fix

`attachDetails` now fetches **every** uncached detail within one
collect, in sequential parallel batches of `DETAIL_FETCH_BATCH = 10`
(burst stays bounded; the round-20 intent — no unbounded fan-out —
is preserved as a concurrency cap instead of a total cap). Regression
test asserts all 15/15 details resolve in one collect with ≤ 10 in
flight. Live re-run: 20/20 waiting items now carry detail.

## Data health otherwise

0 unknown status, ack store clean, Devin no-project ratio 41.3%
(stable, vendor-field-bound P2 unchanged).

## Changeset

`attnbox-collectors` patch (round111-detail-batch).
