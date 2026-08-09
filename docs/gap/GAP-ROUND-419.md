# GAP-ROUND-419 — dogfood 数据健康度复查（纯文档）

Round 419. Driver dimension: dogfood data-health audit
(waiting/ack health + waiting-age distribution), first
since round-408. Live `/api/items` @3,824 sessions
(largest to date).

## Evidence (v0.4.8)

```text
total: 3,824 · waiting 30 · working 58 · idle 6 · done 3,730
unknown statuses: 0
waiting quality: detail 30/30 · action url 30/30 ·
                 attention 30/30 · lastActivityAt 30/30
waiting age:     min 1.8 · median 15.8 · max 1,123.2 min
ack ledger:      0 entries · 0 orphans
```

The 1,123-minute max is the same real long-hanging session
faithfully passed through since rounds 397/408 (vendor-
authoritative cloud status; the 5-minute stale-working cap
is local-heuristic-only by design). Twenty-fifth consecutive
clean data round. Probe daemon killed, port clear.

## Verdict

Data surface fully clean at the largest scale to date. No
P0/P1; docs-only, no changeset.
