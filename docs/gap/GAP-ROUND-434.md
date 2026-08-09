# GAP-ROUND-434 — --host token 门禁 + webhook 复测（纯文档）

Round 434. Driver dimension: `--host` token gate negative
sweep + waiting-webhook channel re-test, first since
round-423. Live org @3,83x sessions, `--host 0.0.0.0` +
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
valid query-token SSE        → 200 (stream held open)
(static shell ungated        → 200, by design)
```

Webhook — startup stock 17 waiting: **0** POSTs.
~6.5-minute observation window: 11 POSTs, 8 unique IDs,
all `event:"waiting"` on real transitions. The two repeated
IDs re-fired minutes apart only after genuine
leave-and-re-enter of waiting (both re-sampled as `waiting`
with fresh `lastActivityAt` matching the re-fire window);
zero duplicates within a waiting period, per the storm-guard
contract (notified set cleared only on observed exit from
waiting).

Probe daemon + sink killed, ports clear, zero residue.

## Verdict

Security gate and webhook contracts all hold. No P0/P1;
docs-only, no changeset.
