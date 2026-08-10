# GAP-ROUND-489 — --host token 门禁 + webhook 复测（纯文档）

Round 489. Driver dimension: `--host` mandatory
token gate negative sweep + waiting webhook
channel re-test, first since round-478. Daemon on
port 4990 (`--host 0.0.0.0`, random 48-hex token,
never printed/committed), sink on port 4791.

## Evidence

Token gate — seven faces:

```text
GET /api/items no token        → 401
GET /api/items bad bearer      → 401
GET /api/events no token       → 401
GET /api/items?token=nope      → 401
POST /api/ack no token         → 401
GET /api/items valid bearer    → 200
GET /api/events?slim=1&token=✓ → 200 text/event-stream
```

Webhook — storm-guard contract:

```text
stock waiting at startup → 8 · 0 false POSTs
~6.5-minute observation  → 4 POSTs · 3 unique ids
repeat id                → 1 (devin:…89c69334…,
                           left waiting between
                           posts — later observed
                           working — legit
                           re-transition per guard
                           contract; zero repeats
                           within a waiting spell)
daemon log               → 0 errors
```

Cleanup: ports 4990/4791 clear, token/log/sink
files removed.

## Verdict

Token gate and webhook storm-guard contracts all
hold. No P0/P1; docs-only, no changeset.
