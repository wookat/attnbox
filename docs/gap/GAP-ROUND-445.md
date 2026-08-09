# GAP-ROUND-445 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 445. Driver dimension: `--host` token gate
negative sweep + waiting-webhook channel live-fire,
first since round-434. Daemon on `--host 0.0.0.0` with
`ATTNBOX_TOKEN` + `ATTNBOX_WEBHOOK_URL` to a local sink.

## Evidence (v0.4.8)

Token gate, seven faces:

```text
/api/items no token           → 401
/api/items bad bearer         → 401
/api/events no token          → 401
POST /api/ack no token        → 401
/api/items wrong query token  → 401
/api/items valid bearer       → 200
/api/events valid query token → 200 (stream)
```

Webhook channel:

```text
startup stock waiting = 20 → 0 spurious POSTs (storm guard)
~6.5 min window → 8 POSTs · 8 unique IDs · 0 duplicates
all payloads {event:"waiting", item:{id, status:"waiting"}}
— genuinely new waiting transitions (fresh Devin sessions)
```

Cleanup: both ports killed and clear, temp sink/logs
removed.

## Verdict

Security-face and webhook contracts all hold. No P0/P1;
docs-only, no changeset.
