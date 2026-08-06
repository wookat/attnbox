# GAP-ROUND-61 — CLI 延迟回归：深页串行抓取拖慢 ls（P1）

Round 61. Driver dimension: real testing (post-round-58 CLI latency) +
competitor freshness check.

## Evidence

`attnbox ls --waiting` on the real 1,006-session org took **5.9 s** —
round-58's pagination fetched deep pages sequentially, adding one
round-trip per 100 sessions. At 106 sessions the same command was 2.9 s
(round-54 numbers), so pagination had silently doubled CLI latency. P1:
the CLI's whole pitch is a quick glance.

## Fix

Deep pages (1..9) are now fetched in **one parallel round-trip**; the
contiguous prefix up to the first short/failed page is kept, the rest
discarded. Deep crawls only happen when page 0 is full (100+ session
orgs) and at most every 30 s (round-58 cache), so the parallel burst is
bounded.

Measured after fix: `ls --waiting` **3.0 s** (was 5.9 s). 88 tests green.

## Competitor freshness (no change)

- ccmux tip is still `b2bc7d4` — the exact commit inspected in
  round-52; no new activity.
- ProjectDispatcher: last commit 2026-06-28 (circuit-breaker default
  tweak); still dispatch-only, no session discovery.

## Honest boundary

Remaining ~3 s is dominated by the page-0 fetch + up-to-10 parallel
detail fetches + local collectors; further cuts would need a persistent
CLI-side cache, which is a different trade (staleness in a one-shot
command) — not pursued without evidence it matters.
