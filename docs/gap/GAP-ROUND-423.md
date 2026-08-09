# GAP-ROUND-423 — --host token 门禁 + webhook 复测（纯文档）

Round 423. Driver dimension: `--host` token gate negative
sweep + waiting-webhook channel re-test, first since
round-412. Live org @3,82x sessions, `--host 0.0.0.0` +
`ATTNBOX_TOKEN` + `ATTNBOX_WEBHOOK_URL` → local sink.

## Evidence (v0.4.8)

Token gate — seven faces, all correct:

```text
/api/items no token          → 401
/api/items bad bearer        → 401
/api/events?slim=1 no token  → 401
POST /api/ack no token       → 401
/api/items?token=wrong       → 401
valid bearer                 → 200
valid query-token SSE        → 200
(static shell ungated        → 200, by design)
```

Webhook — startup stock 17 waiting: **0** POSTs (storm
guard holds). ~6.5-minute observation window: 11 POSTs,
10 unique IDs, all `event:"waiting"` on real transitions.
The single repeated ID (`devin:…b918`) re-fired only after
a genuine leave-and-re-enter of waiting (fresh
`lastActivityAt` at re-fire time) — exactly the guard
contract; zero duplicates within a waiting period.

Probe daemon + sink killed, ports clear, zero residue.

## Verdict

Security gate and webhook contracts all hold. No P0/P1;
docs-only, no changeset.
