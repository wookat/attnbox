# GAP-ROUND-397 — dogfood 数据健康度复查（纯文档）

Round 397. Driver dimension: dogfood data-health audit
(waiting/ack health + waiting-age distribution), first since
round-386.

## Evidence (v0.4.8, live org)

```text
3,767 sessions (largest to date)
22 waiting · 54 working · 6 idle · 3,685 done
0 unknown statuses · 0 bad attention values
22/22 waiting with detail + url + attention
0 missing/invalid lastActivityAt
waiting age min 0.5 / median 16.7 / max 942.0 minutes
0 ack entries / 0 orphans
```

The 942-minute max is a real long-hanging blocked session
("基线落地批次①" — answer), faithful vendor pass-through per
the round-88 contract, not a staleness bug; the rest of the
distribution is fresh (median under 17 minutes).

Twenty-third consecutive clean data round. Probe daemon
killed, port clear.

## Verdict

Data surface fully clean at the largest scale audited. No
P0/P1; docs-only, no changeset.
