# GAP-ROUND-259 — 安全面 + webhook 复测（纯文档）

Round 259. Driver dimension: real testing — `--host` token gate
negative surfaces + waiting webhook exact-once channel, first
since round-237.

## Evidence (v0.4.8, live org @3,383 sessions)

### --host token gate (non-loopback `0.0.0.0`, host IP)

```text
1 no-token  /api/items      401
2 bad-token /api/items      401
3 good      /api/items      200
4 no-token  /api/events     401
5 good      /api/events     200
6 no-token  /api/ack        401
7 good      /api/ack        200
```

### waiting webhook (local sink, `ATTNBOX_WEBHOOK_URL`)

```text
startup against 29 stock waiting items: 0 POSTs (storm guard)
3.5-minute window: 5 POSTs · 5 distinct ids · 0 duplicates
all 5 POSTed ids verified as real current waiting sessions
```

Rounds 29/84 token contracts and rounds 69/71 exact-once +
startup storm-guard contracts all hold. Probe daemons and sink
killed via listener PIDs, ports 4929/4890 verified clear, logs
removed.

## Verdict

No P0/P1; docs-only, no changeset.
