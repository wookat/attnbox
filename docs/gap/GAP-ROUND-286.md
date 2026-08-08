# GAP-ROUND-286 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 286. Driver dimension: real-world security testing —
`--host 0.0.0.0` + `ATTNBOX_TOKEN` gate negatives across every
API surface, plus waiting-webhook startup storm guard and
exactly-once delivery on real transitions, first since
round-275.

## Evidence (v0.4.8, live daemon @3,449 sessions)

### Token gate (seven faces)

```text
no token   /api/items          → 401
no token   /api/events (SSE)   → 401
no token   /api/events?slim=1  → 401
bad token  /api/items          → 401
no token   POST /api/ack       → 401
?token=<good> query param      → 200
Bearer <good> header (items/SSE) → 200
```

### Waiting webhook

```text
startup against 20 stock waiting items: 0 POSTs (storm guard)
3.5-minute window: exactly 2 POSTs — both genuine new waiting
  transitions (distinct devin session IDs)
duplicates: 0
```

Contracts from rounds 29/84 (token gate), 69 (webhook channel),
and 71 (storm guard) all hold. One probe method note: a relative
CLI path in a detached daemon launch resolves against the shell
cwd — the first daemon launch failed with MODULE_NOT_FOUND and
was relaunched with the absolute path (evidence unaffected;
gate probes ran only against the live listener). Daemon and
receiver killed via listener PIDs, ports clear, temp
script/logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
