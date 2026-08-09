# GAP-ROUND-368 — --host token 门禁 + webhook 复测（纯文档）

Round 368. Driver dimension: `--host` token gate negative sweep
+ waiting-webhook channel re-test, first since round-357. Real
daemon (`--host 0.0.0.0`, random `ATTNBOX_TOKEN`,
`ATTNBOX_WEBHOOK_URL` → local sink), live org data.

## Evidence (v0.4.8)

Token gate — seven faces:

```text
1 no token /api/items        401
2 bad bearer                 401
3 good bearer                200
4 no token /api/events?slim  401
5 good query token SSE       200
6 bad query token            401
7 no token POST /api/ack     401
```

Webhook:

```text
t0 waiting stock: 14 → startup storm POSTs: 0
4-minute window: 6 POSTs · 6 unique ids · zero duplicates
4/6 ids outside t0 stock (genuine new transitions;
  lastActivityAt within ~1 min of each POST)
2/6 ids in t0 stock: re-POSTed only per the storm-guard
  contract (re-notify only after the ID is observed leaving
  waiting and re-transitioning; rounds 71/346/357) — both
  confirmed still waiting post-transition
```

Sink + daemon killed, ports clear, temp files removed.

## Verdict

All rounds 29/84/69/71 contracts hold. No P0/P1; docs-only, no
changeset.
