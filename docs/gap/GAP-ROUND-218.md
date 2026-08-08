# GAP-ROUND-218 — --host token 门禁 + webhook 通道复测（纯文档）

Round 218. Driver dimension: real testing — security surface
(`--host` token gate) + waiting-webhook channel (first since
round-202).

## Evidence (v0.4.8, live daemon)

### Token gate, six faces (`--host 0.0.0.0` + `ATTNBOX_TOKEN`)

```text
/api/items  no token      -> 401
/api/items  bad Bearer    -> 401
/api/items  good Bearer   -> 200
/api/events no token      -> 401
/api/events ?token=...    -> 200 (stream)
/api/ack    no token      -> 401
/api/ack    good Bearer   -> 200
```

Rounds 29/84 negative contract holds on every API/SSE surface.

### Webhook channel (fresh sink on exclusive port 4879)

- Startup against **8 stock waiting** items: **0 spurious POSTs**
  (storm guard — stock never re-notified).
- 3-minute live window: **2 POSTs, both legitimate brand-new
  waiting transitions** (verified against `/api/items`: both items
  waiting with lastActivityAt matching the POST timestamps), 0
  duplicates.

Cleanup: both probe daemons and the sink killed, ports 4954/4953/
4879 verified clear, temp script removed.

## Verdict

Rounds 29/84/71 contracts all hold on v0.4.8. No P0/P1; docs-only,
no changeset.
