# GAP-ROUND-77 — Devin 1,000 会话上限再次漏报 waiting（P0 复发同类）

Round 77. Driver dimension: dogfood data analysis — the agent
distribution showed `devin: 1000` exactly, which smelled like a cap,
not a coincidence.

## Found (P0)

Round-58 fixed the *un*paginated collector with a 10-page safety cap
(≤ 1,000 sessions, the then-tested UI scale). The dogfood org has since
grown to **2,812 sessions** — and a real `blocked` session ("中转站",
updated today) sat at offset ~1,400, invisible in attnbox. Missed
waiting is the worst failure mode; same class as round-58.

## Fix

Crawl the backlog to exhaustion in parallel batches of 10 pages,
stopping at the first short/failed page, with a hard safety cap raised
to 100 pages (10,000 sessions). The 30 s deep-page cache is unchanged,
so steady-state API traffic stays bounded (2,812 sessions ≈ 3 batched
round-trips at most every 30 s).

Real-inbox verification: 2,818 items total, waiting 12 → 30 (the
deep blocked session and its peers now reported); `ls --waiting` 2.4 s.

## Boundary honesty

LIMITS updated: cap is now "exhausted, hard cap 10,000" instead of
"truncate at 1,000". UI at 2,818 items still renders fine (finished
collapsed by default); a full re-benchmark at 3k scale is queued for a
follow-up regression round.

94 tests green. collectors patch changeset — release-worthy soon
(missed-waiting correctness).
