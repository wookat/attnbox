# GAP-ROUND-156 — dogfood 数据健康度复查（纯文档）

Round 156. Driver dimension: data analysis — waiting/ack data health
+ waiting age distribution on the live org (first since round-148).

## Evidence (live crawl, v0.4.8)

- 3,094 items (up from 3,069 in round-148): 2,985 done / 78 working /
  25 waiting / 6 idle — **0 unknown statuses**.
- Waiting: 25/25 have `detail` (what the agent is asking) and 25/25
  have `url`; all `attention: answer`. Round-111's batch detail fetch
  keeps holding well past the old 10-item cap (25 concurrent
  waiting).
- Waiting ages 0.9–44.1 minutes — a busy-org spread, no stuck/stale
  rows (the 44-minute tail is a real unanswered question, correctly
  surfaced).
- Ack ledger: 0 entries, 0 orphans (round-154's probe cleanup held).
- `summary` consistent with the item list (total 3,094, waiting 25).

## Verdict

Data surface fully clean at grown scale. No P0/P1; docs-only, no
changeset.
