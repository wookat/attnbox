# GAP-ROUND-375 — dogfood 数据健康度复查（纯文档）

Round 375. Driver dimension: dogfood waiting/ack data health +
waiting-age distribution, first since round-364. Live probe
daemon `/api/items` snapshot.

## Evidence (v0.4.8)

```text
total sessions:   3,718 (largest to date)
by status:        17 waiting · 65 working · 6 idle · 3,630 done
unknown status:   0
waiting quality:  17/17 detail · 17/17 url · 17/17 attention
waiting age:      median 16.1 min · max 691 min · none >24h
ack ledger:       size 0 · orphan acks 0
```

Twenty-first consecutive clean data round. Probe daemon killed,
port clear.

## Verdict

Data surface fully clean at record scale. No P0/P1; docs-only,
no changeset.
