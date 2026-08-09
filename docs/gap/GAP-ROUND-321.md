# GAP-ROUND-321 — dogfood 数据健康度复查（纯文档）

Round 321. Driver dimension: data analysis — dogfood
waiting/ack data health plus waiting-age distribution, first
since round-311. Real probe daemon against the live org,
authoritative `/api/items`.

## Evidence (v0.4.8, live org — largest data audit to date)

```text
summary: 3,576 total · 19 waiting · 60 working
status counts: done 3,491 · working 60 · waiting 19 · idle 6 ·
               unknown 0
waiting coverage: 19/19 detail · 19/19 url · 19/19 attention
                  (all "answer")
waiting age min / median / max: 0.5 / 16.8 / 120.3 minutes
waiting older than 24h: 0
acked entries: 0 · orphan acks: 0
```

Sixteenth consecutive clean data round: zero unknown statuses,
every waiting item carries what-it-wants detail, an action URL,
and an attention type; the waiting set is fresh (median 16.8
min, max 2.0 h, none stale past a day); the ack ledger is empty
with zero orphans. Probe daemon killed, port clear, temp files
removed.

## Verdict

No P0/P1; docs-only, no changeset.
