# GAP-ROUND-478 — --host token 门禁 + webhook 复测（纯文档）

Round 478. Driver dimension: `--host` token gate
negative-case sweep + waiting-webhook channel
re-test, first since round-467. Probe daemon on
port 4990 (`--host 0.0.0.0` + random
`ATTNBOX_TOKEN`), local sink on port 4791, live
data.

## Evidence (v0.4.8, main)

Token gate, seven faces:

```text
GET /api/items no token        → 401
GET /api/items bad bearer      → 401
GET /api/events no token       → 401
GET /api/items?token=nope      → 401
POST /api/ack no token         → 401
GET /api/items valid bearer    → 200
GET /api/events?slim=1&token=✓ → 200 text/event-stream
```

Webhook channel (~7.5 minutes observed):

```text
stock waiting at startup → 16; zero stale-stock
  reposts (the 2 startup-window posts carried
  lastActivityAt within seconds of the crawl —
  genuinely fresh transitions, not stock replay)
total POSTs → 5, unique ids → 5, repeats → 0
payload shape → {"event":"waiting","item":{...}}
  with id/status/attention/detail/url intact
daemon log → 0 errors
```

Cleanup: ports 4990/4791 clear, temp token/log
files removed.

## Verdict

Token gate and webhook storm-guard contracts all
hold. No P0/P1; docs-only, no changeset.
