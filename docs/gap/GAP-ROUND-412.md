# GAP-ROUND-412 — --host token 门禁 + webhook 复测（纯文档）

Round 412. Driver dimension: `--host` token gate (multi-face
negatives) + waiting-webhook channel re-test, first since
round-401. Live daemon @3,79x sessions bound to 0.0.0.0 with
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
startup waiting stock: 22 → zero startup POSTs
~6.5-minute window: 8 POSTs · 7 unique IDs, all genuine
new waiting transitions (first pair on the second collect
tick, ~90s after start — not in the seeded stock)
one ID re-posted 24s apart — guard contract: an ID is only
re-notified after it was observed leaving waiting, so this
is a real leave-and-re-enter transition (live-flapping
session); zero duplicates within a waiting spell
payload shape: {event:"waiting", item:{id,...}} — correct
```

Probes killed, both ports clear, temp files removed.

## Verdict

Gate and webhook contracts all hold. No P0/P1; docs-only, no
changeset.
