# GAP-ROUND-456 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 456. Driver dimension: `--host` token gate
negative sweep + waiting-webhook channel re-test,
first since round-445. Probe daemon on port 4980
(`--host 0.0.0.0`, `ATTNBOX_TOKEN` set), local sink
on 4979.

## Token gate — seven faces

```text
/api/items no token           → 401
/api/items bad bearer         → 401
/api/events no token          → 401
/api/items wrong query token  → 401
POST /api/ack no token        → 401
/api/items valid bearer       → 200
/api/events valid query token → 200 (event-stream)
```

## Webhook channel

```text
startup stock waiting = 17 → 0 spurious stock POSTs
  (first POSTs were fresh transitions, lastActivity
   0.5–1.2 min, younger than daemon uptime)
~6.5 min window → 18 POSTs · 16 unique IDs
  2 IDs re-POSTed per the guard contract (only after
  observed leaving waiting, then genuinely
  re-transitioned; zero duplicates within a waiting
  period)
payloads → {"event":"waiting","item":{...status:
  "waiting"}} on every POST
daemon log errors (error|unhandled|ECONN) → 0
```

Cleanup: ports 4980/4979 clear, sink/log files
removed.

## Verdict

Gate and webhook contracts all hold. No P0/P1;
docs-only, no changeset.
