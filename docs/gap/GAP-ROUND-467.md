# GAP-ROUND-467 — --host token 门禁 + webhook 复测（纯文档）

Round 467. Driver dimension: `--host` token gate
negative sweep + waiting-webhook channel re-test,
first since round-456. Probe daemon on port 4980
(`--host 0.0.0.0`, `ATTNBOX_TOKEN` set,
`ATTNBOX_WEBHOOK_URL` → local sink on 4979).

## Evidence (v0.4.8)

Token gate — seven faces:

```text
/api/items no token          → 401
/api/items bad bearer        → 401
/api/events no token         → 401
/api/items bad query token   → 401
/api/ack no token (POST)     → 401
/api/items valid bearer      → 200
/api/events?token=<valid>    → 200 text/event-stream
```

Webhook channel:

```text
startup stock  → 21 waiting items, zero mistaken
                 stock POSTs (the first POSTs were
                 real fresh transitions with
                 lastActivity 0.2–1.0 min)
~6.5 min window→ 10 POSTs · 8 unique IDs · 2 IDs
                 re-sent after genuinely leaving and
                 re-entering waiting (guard contract:
                 an ID is only released from the
                 notified set once seen out of
                 waiting) · zero duplicates within a
                 waiting period · all payloads
                 event="waiting", status="waiting"
daemon log     → 0 error|unhandled|ECONN matches
```

Cleanup: ports 4980/4979 clear, sink/logs/capture
removed.

## Verdict

Token gate and webhook storm-guard contracts all
hold. No P0/P1; docs-only, no changeset.
