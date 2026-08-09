# GAP-ROUND-386 — dogfood 数据健康度复查（纯文档）

Round 386. Driver dimension: dogfood data health (waiting/ack
health + waiting-age distribution), first since round-375.
Live probe daemon against the real org.

## Evidence (v0.4.8)

```text
total:           3,742 sessions (largest to date)
status mix:      16 waiting · 53 working · 6 idle · 3,667 done
unknown status:  0
waiting quality: 16/16 with detail + url + attention
waiting age:     min 0.2 · median 8.7 · max 843.2 minutes
                 (max is one real long-idle blocked Devin
                  session — faithful vendor pass-through per
                  the round-88 contract, not staleness)
lastActivityAt:  0 missing/invalid
ack ledger:      0 entries · 0 orphans
```

Probe daemon killed, port clear.

## Verdict

Twenty-second consecutive clean data round at the largest
scale to date. No P0/P1; docs-only, no changeset.
