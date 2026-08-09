# GAP-ROUND-408 — dogfood 数据健康度复查（纯文档）

Round 408. Driver dimension: dogfood data-health audit
(waiting/ack integrity + waiting-age distribution), first
since round-397. Live daemon, full `/api/items` snapshot.

## Evidence (v0.4.8)

```text
3,789 sessions (largest to date)
17 waiting · 61 working · 7 idle · 3,704 done
0 unknown statuses · 0 bad attention values
17/17 waiting with detail + url + attention
0 missing/invalid lastActivityAt
waiting age min 1.5 / median 12.3 / max 1,022.0 minutes
0 ack entries / 0 orphans
```

The 1,022-minute max is the same real long-hanging blocked
session first noted round-397 ("基线落地批次①" — answer),
faithful vendor pass-through per the round-88 contract, not
a staleness bug; the rest of the distribution is fresh
(median 12.3 minutes). Twenty-fourth consecutive clean data
round. Probe daemon killed, port clear, temp files removed.

## Verdict

Data plane fully clean at record scale. No P0/P1; docs-only,
no changeset.
