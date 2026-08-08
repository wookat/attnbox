# GAP-ROUND-228 — dogfood 数据健康度复查（纯文档）

Round 228. Driver dimension: data analysis — dogfood waiting/ack
data-plane health + waiting age distribution, first since
round-215.

## Evidence (v0.4.8, live daemon, real `/api/items`)

```text
summary: 3,277 total · 9 waiting · 60 working
status counts: done 3,202 · working 60 · waiting 9 · idle 6 · unknown 0
waiting detail coverage: 9/9 · url coverage: 9/9 · attention set: 9/9
waiting age min / median / max: 7.9 / 13.2 / 28.3 minutes
waiting older than 24h: 0
acked entries: 0 · orphan acks: 0
```

Seventh consecutive clean data round (rounds 174/184/194/204/
215/this). No stuck waiting, no unknown statuses, no orphan ack
ledger entries. Probe daemon cleaned via listener PID, port 4947
verified clear.

## Verdict

No P0/P1; docs-only, no changeset.
