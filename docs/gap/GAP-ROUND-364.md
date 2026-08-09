# GAP-ROUND-364 — dogfood 数据健康度复查（纯文档）

Round 364. Driver dimension: dogfood waiting/ack data health +
waiting-age distribution, first since round-353. Live probe
daemon against the real org, warm-up then full `/api/items`
snapshot.

## Evidence (v0.4.8)

```text
total sessions:   3,688 (largest to date)
by status:        22 waiting · 62 working · 6 idle · 3,598 done
unknown status:   0
waiting quality:  22/22 detail · 22/22 url · 22/22 attention
waiting age:      median 18.8 min · max 545.0 min · none >24h
ack ledger:       size 0 · orphan acks 0
```

Twentieth consecutive clean data round. Probe daemon killed,
port clear.

## Verdict

Data surface fully clean at record scale. No P0/P1; docs-only,
no changeset.
