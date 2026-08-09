# GAP-ROUND-401 — --host token 门禁 + webhook 复测（纯文档）

Round 401. Driver dimension: `--host` token gate (multi-face
negatives) + waiting-webhook channel re-test, first since
round-390. Live daemon @3,76x sessions bound to 0.0.0.0 with
`ATTNBOX_TOKEN` + `ATTNBOX_WEBHOOK_URL` → local sink.

## Evidence (v0.4.8)

Token gate — seven faces (+ static shell):

```text
/api/items no token: 401 · bad bearer: 401
slim SSE no token: 401 · POST /api/ack no token: 401
bad query token: 401
valid bearer /api/items: 200 · valid query-token SSE: 200
static shell (no token needed): 200
```

Webhook storm guard:

```text
startup waiting stock: 15 → zero startup POSTs
~5.5-minute window: 5 POSTs · 4 unique IDs
one ID re-posted ~88s apart — guard contract: an ID is only
re-notified after it was observed leaving waiting, so the
repeat is a real leave-and-re-enter transition (the session
was live-flapping between working and waiting); all other
posts are genuine new waiting transitions, zero duplicates
within a waiting spell
payload shape: {event:"waiting", item:{id,...}} — correct
```

Probes killed, both ports clear, temp files removed.

## Verdict

Gate and webhook contracts all hold. No P0/P1; docs-only, no
changeset.
