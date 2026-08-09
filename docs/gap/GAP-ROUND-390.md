# GAP-ROUND-390 — --host token 门禁 + webhook 复测（纯文档）

Round 390. Driver dimension: `--host` token gate negative
sweep + waiting-webhook channel re-test, first since
round-379. Live daemons against the real org.

## Evidence (v0.4.8)

Token gate, seven faces (`--host 0.0.0.0` + `ATTNBOX_TOKEN`):

```text
no token   /api/items          401
bad bearer /api/items          401
no token   /api/events?slim=1  401
no token   POST /api/ack       401
bad query token /api/items     401
good bearer /api/items         200
good query-token SSE           200
static / (no token)            200  (by design — UI shell only)
```

Webhook channel (local sink, ~4.5-minute window):

```text
startup stock:  26 waiting → no startup storm (0 stock POSTs)
posts:          3 total · 3 unique IDs · 0 duplicates
                all 3 genuine new waiting conversions
                (lastActivityAt 5–6 s before each POST; all
                still waiting at window end)
payload shape:  {event:"waiting", item:{id,status,...}} —
                IDs read via payload.item.id
```

All probe daemons/sink killed, ports clear.

## Verdict

Token gate and webhook storm-guard contracts all hold. No
P0/P1; docs-only, no changeset.
