# GAP-ROUND-379 — --host token 门禁 + webhook 复测（纯文档）

Round 379. Driver dimension: `--host` token gate negative
sweep + waiting-webhook channel re-test, first since
round-368. Live org (~3,71x sessions), local HTTP sink.

## Evidence (v0.4.8)

Token gate, seven faces (daemon on `--host 0.0.0.0` with
`ATTNBOX_TOKEN`):

```text
no token  /api/items          401
bad bearer /api/items         401
no token  /api/events?slim=1  401
no token  POST /api/ack       401
bad query token /api/items    401
good bearer /api/items        200
good query-token SSE          200
static / (no token)           200  (by design — UI shell only)
```

Webhook channel (4-minute live window):

```text
startup stock:  17 waiting → no startup storm
posts:          3 total · 3 unique IDs · 0 duplicates
  1 × stock ID re-posted only after a real re-transition
      (lastActivityAt seconds before the POST; left waiting
      by window end) — guard contract holds
  2 × genuine new waiting conversions
payload shape:  {event:"waiting", item:{id,status,...}} —
      IDs read via payload.item.id (round-368 method note)
```

Sink + probe daemons killed, ports clear.

## Verdict

Both security contracts hold (rounds 29/84/69/71 lineage).
No P0/P1; docs-only, no changeset.
