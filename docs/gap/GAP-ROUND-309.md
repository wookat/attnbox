# GAP-ROUND-309 — --host token 门禁 + webhook 复测（纯文档）

Round 309. Driver dimension: real-runtime security surface —
`--host` token gate negative sweep + waiting-webhook channel,
first since round-299.

## Evidence (v0.4.8, live daemon `--host 0.0.0.0` with
`ATTNBOX_TOKEN` + `ATTNBOX_WEBHOOK_URL`, @3,551 sessions)

Token gate, seven faces:

```text
no token   /api/items      → 401
bad bearer /api/items      → 401
no token   /api/events     → 401
no token   POST /api/ack   → 401
wrong ?token= query        → 401
good bearer /api/items     → 200
good ?token= query         → 200
static shell /             → 200 (by design)
```

Webhook channel (rounds 29/84/69/71 contracts):

- 17 pre-existing waiting items at startup → **zero** startup
  POSTs (storm guard holds).
- 3.5-minute observation window → exactly **5** POSTs, all five
  unique session IDs (uniq -c all 1, zero duplicates), each a
  genuine new waiting transition — 4 of 5 still in the waiting
  set at window end, the fifth had already left waiting
  (answered), consistent with a legitimate transient.

Sink and daemon killed via listener PIDs, ports 4933/4934
clear, temp scripts and logs removed. `r309secret` was
probe-only and never committed.

## Verdict

No P0/P1; docs-only, no changeset.
