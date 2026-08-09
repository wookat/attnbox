# GAP-ROUND-324 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 324. Driver dimension: security surface plus webhook
channel re-test, first since round-309 — `--host` mandatory
token gate negative sweep and `ATTNBOX_WEBHOOK_URL` exactly-once
delivery against live stock.

## Evidence (v0.4.8, live org @3,584 sessions)

Token gate (daemon on `--host 0.0.0.0` with `ATTNBOX_TOKEN`),
seven faces:

```text
1 /api/items no token          → 401
2 /api/items wrong bearer      → 401
3 /api/items correct bearer    → 200
4 /api/items wrong ?token=     → 401
5 /api/items correct ?token=   → 200
6 /api/events?slim=1 no token  → 401
7 /api/events correct bearer   → streams data
8 POST /api/ack no token       → 401
  static shell (/)             → 200 (by design; data needs token)
```

Webhook channel (local sink + fresh daemon with
`ATTNBOX_WEBHOOK_URL`):

- startup against 24 stock waiting items → **zero** POSTs
  (round-71 storm guard holds);
- 3.5-minute observation window → exactly **2** POSTs, both
  verified as genuinely new waiting transitions (ages 1.4 / 0.8
  min at check time), zero duplicates.

Contracts from rounds 29/84/69/71 all hold. Both probe daemons
and the sink killed, all ports clear, temp files removed.

## Verdict

No P0/P1; docs-only, no changeset.
