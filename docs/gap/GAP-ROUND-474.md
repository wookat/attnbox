# GAP-ROUND-474 — dogfood 数据健康度复查（纯文档）

Round 474. Driver dimension: dogfood data-health
audit (waiting/ack health + waiting-age
distribution), first since round-463. Probe daemon
on port 4987 against the live org.

## Evidence (v0.4.8, main, 3,926 sessions — largest
to date)

```text
status mix    → waiting 13 · working 58 · idle 6 ·
                done 3,849 · unknown 0
waiting 13/13 → detail + url + attention all present
attention mix → answer 13
waiting age   → min 0.9 · median 12.5 · max 1,523 min
ack ledger    → 0 entries · 0 orphans
missing agent → 0 items
```

The 1,523-minute max is the same genuinely
long-hanging Devin session tracked since round-397
(devin:…abf699c3…, "基线落地批次①"), faithfully passed
through per the vendor-authoritative status
contract — not a staleness bug.

Cleanup: port 4987 clear, temp log removed.

## Verdict

Thirtieth consecutive clean data round at the
largest scale yet. No P0/P1; docs-only, no
changeset.
