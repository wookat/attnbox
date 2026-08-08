# GAP-ROUND-299 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 299. Driver dimension: real testing — `--host` token gate
negative sweep + waiting webhook channel, first since round-286.

## Evidence (v0.4.8, `--host 0.0.0.0` + `ATTNBOX_TOKEN` +
`ATTNBOX_WEBHOOK_URL`, LAN-address requests, live data)

Token gate, seven faces:

```text
no token   /api/items      → 401
bad bearer /api/items      → 401
no token   /api/events     → 401
no token   POST /api/ack   → 401
wrong ?token= query        → 401
good bearer /api/items     → 200
good bearer /api/events    → 200
(static shell / stays 200 by design — token arrives via /?token=)
```

Correct `?token=` query also passes (documented contract,
`daemon.test.ts` pins both faces).

Webhook channel: 19 stock waiting items at daemon startup
produced **zero** POSTs (storm guard holds); a 3.5-minute
observation window saw exactly 2 POSTs, both verified as
sessions currently waiting (legitimate new transitions), zero
duplicates. Rounds 29/84/69/71 contracts all hold.

Sink + daemon killed via listener PIDs, both ports clear, temp
sink/script/logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
