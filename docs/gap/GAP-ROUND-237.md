# GAP-ROUND-237 — 安全面 + webhook 通道复测（纯文档）

Round 237. Driver dimension: real-world testing — `--host` token
gate negative matrix + waiting webhook channel, first since
round-218.

## Evidence (v0.4.8, live org @3,301 sessions)

### --host token gate (non-loopback, `ATTNBOX_TOKEN` set)

```text
/api/items  no token:      401
/api/items  bad query:     401
/api/items  bad bearer:    401
/api/events?slim=1 no tok: 401
/api/ack    no token:      401
/api/items  good query:    200
/api/items  good bearer:   200
static shell (by design):  200
```

All six negative faces reject, both credential forms accept —
rounds 29/84 contract holds.

### waiting webhook channel (`ATTNBOX_WEBHOOK_URL`, local sink)

```text
startup stock: 13 waiting → 0 POSTs (no storm on cold start)
3-minute window: 3 POSTs, 3 distinct devin IDs,
  all legitimate new waiting transitions · 0 duplicates
```

Rounds 69/71 exactly-once contract holds. Sink and daemon killed
via listener PIDs, ports 4942/4699 verified clear, logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
