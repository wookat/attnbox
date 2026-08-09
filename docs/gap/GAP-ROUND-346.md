# GAP-ROUND-346 — --host token 门禁 + webhook 复测（纯文档）

Round 346. Driver dimension: security surface — `--host` token
gate seven-face negative sweep + waiting-webhook channel re-test,
first since round-335; includes follow-up on the round-335 open
observation.

## Evidence (v0.4.8)

Token gate (`--host 0.0.0.0`, random token):

```text
1 no token /api/items        401
2 bad bearer                 401
3 good bearer                200
4 no token /api/events?slim  401
5 good query token SSE       200
6 bad query token            401
7 no token POST /api/ack     401
```

Webhook (local sink, live org):

```text
t0 waiting stock: 19 → startup storm POSTs: 0
4-min window: exactly 2 POSTs · unique ids · both outside t0 stock
POST 1: lastActivityAt 06:40:03 → POST 06:40:25 (+22s)
POST 2: lastActivityAt 06:41:28 → POST 06:41:53 (+25s)
```

Round-335 open observation follow-up: the daemon emits no
per-collect-cycle log lines (startup line only), so cycle IDs are
unavailable; attribution was checked via `lastActivityAt`→POST
proximity instead. Both POSTs this window fired within ~25 s of
the item's real transition — no early-visible-then-late-POST
signature reproduced. Combined with round-324 (24 stock → 0 POST)
and round-335's own dedup evidence, the observation is closed as
design-in (detail burst cap staggering first full observation, no
duplicate or missed delivery). Probes cleaned, both ports clear.

## Verdict

Rounds 29/84/69/71 contracts all hold; round-335 observation
closed. No P0/P1; docs-only, no changeset.
