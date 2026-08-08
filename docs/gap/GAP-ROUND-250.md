# GAP-ROUND-250 — dogfood 数据健康度复查（纯文档）

Round 250. Driver dimension: data analysis — dogfood waiting/ack
data health + waiting age distribution, first since round-238.

## Evidence (v0.4.8, live daemon @3,331 sessions)

```text
summary: 3,331 total · 13 waiting · 70 working
status counts: done 3,242 · working 70 · waiting 13 · idle 6 · unknown 0
waiting detail coverage: 13/13 · url: 13/13 · attention: 13/13
waiting age min / median / max: 5.4 / 16.8 / 28.3 minutes
waiting older than 24h: 0
acked entries: 0 · orphan acks: 0
```

Ninth consecutive clean data round (after 184/194/204/215/
228/238…): zero unknown statuses, full waiting detail/url/
attention coverage, all waiting ages fresh (median 16.8 min, no
stale >24h), ack ledger empty with zero orphans. Probe daemon
killed via listener PID, port 4934 verified clear, log removed.

## Verdict

No P0/P1; docs-only, no changeset.
