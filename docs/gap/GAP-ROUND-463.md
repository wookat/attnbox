# GAP-ROUND-463 — dogfood 数据健康度复查（纯文档）

Round 463. Driver dimension: dogfood data-health audit
(waiting/ack health + waiting-age distribution), first
since round-452. Probe daemon on port 4983 against the
live org; authoritative `/api/items` face.

## Evidence (v0.4.8, @3,916 sessions — largest to date)

```text
status mix    → waiting 22 · working 62 · idle 6 ·
                done 3,826 · unknown 0
waiting 22/22 → detail + url + attention all present
attention mix → answer 22
waiting age   → min 1.8 · median 10.7 · max 1,441 min
                (max is the same real long-hanging
                 Devin session tracked since round-397,
                 faithfully passed through)
ack ledger    → 0 entries · 0 orphans
missing agent → 0 items
```

Cleanup: port 4983 clear, temp log removed.

## Verdict

Twenty-ninth consecutive clean data round at record
scale. No P0/P1; docs-only, no changeset.
