# GAP-ROUND-275 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 275. Driver dimension: real testing — `--host` token gate
negative faces + waiting-webhook channel re-test, first since
round-259.

## Evidence (v0.4.8, live daemon)

### Token gate (--host 0.0.0.0 + ATTNBOX_TOKEN, seven faces)

```text
no token   /api/items        → 401
bad token  /api/items        → 401
no token   /api/events (SSE) → 401
no token   /api/events?slim=1 → 401
no token   POST /api/ack     → 401
?token=<good> query param    → 200 (documented alternative)
Bearer <good> header         → 200
```

All negative faces reject with 401; both documented positive
faces pass — rounds 29/84 contract holds.

### Waiting webhook (ATTNBOX_WEBHOOK_URL → local receiver)

```text
startup against 20 stock waiting items: 0 POSTs (storm guard)
3.5-minute window: exactly 1 POST — a genuine new
  waiting transition (devin session verified waiting via
  /api/items), payload carries event/item with title + url
duplicates: 0
```

Rounds 69/71/84 contracts all hold: stock never re-notified,
each real transition posted exactly once. Probe daemon and
receiver killed via listener PIDs, ports 4920/4899 clear, temp
logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
