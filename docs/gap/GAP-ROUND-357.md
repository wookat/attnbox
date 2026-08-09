# GAP-ROUND-357 — --host token 门禁 + webhook 复测（纯文档）

Round 357. Driver dimension: `--host` token gate negative sweep
+ waiting-webhook channel re-test, first since round-346. Real
daemon (`--host 0.0.0.0`, random token) against the live org,
local webhook sink.

## Evidence (v0.4.8)

Token gate — seven faces all correct:

```text
1 no token /api/items        401
2 bad bearer                 401
3 good bearer                200
4 no token /api/events?slim  401
5 good query token SSE       200
6 bad query token            401
7 no token POST /api/ack     401
```

Webhook (4-minute observation window):

```text
t0 waiting stock: 21 → startup storm POSTs: 0
window: 6 POSTs · 6 unique ids · zero duplicates
5/6 ids outside t0 stock (genuine new transitions)
1/6 id in t0 stock: re-POST only after a fresh transition —
  lastActivityAt 08:33:54 → POST 08:33:58 (+4s); the session
  had left waiting (now `working`), matching the storm-guard
  contract (re-notify only after the ID is observed leaving
  waiting; rounds 71/346)
```

Rounds 29/84/69/71 contracts all hold. Probe daemon + sink
killed, ports clear.

## Verdict

No P0/P1; docs-only, no changeset.
