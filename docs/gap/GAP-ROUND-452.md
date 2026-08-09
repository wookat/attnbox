# GAP-ROUND-452 — dogfood 数据健康度复查（纯文档）

Round 452. Driver dimension: dogfood data-health audit
(waiting/ack health + waiting-age distribution), first
since round-441. Probe daemon on port 4983 against the
live org; authoritative `/api/items` face.

## Evidence (v0.4.8, @3,898 sessions — largest to date)

```text
status mix    → waiting 21 · working 75 · idle 6 ·
                done 3,796 · unknown 0
waiting 21/21 → detail + url + attention all present
attention mix → answer 21
waiting age   → min 0.9 · median 19.4 · max 1,363 min
                (max is the same real long-hanging
                 Devin session tracked since round-397,
                 faithfully passed through)
ack ledger    → 0 entries · 0 orphans
missing agent → 0 items
```

Cleanup: port 4983 clear, temp log removed.

## Verdict

Twenty-eighth consecutive clean data round at record
scale. No P0/P1; docs-only, no changeset.
