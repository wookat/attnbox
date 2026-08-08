# GAP-ROUND-202 — --host token 门禁 + webhook 通道复测（纯文档）

Round 202. Driver dimension: real-world testing — `--host` token
gate negative surfaces + waiting-webhook channel re-proof (first
since round-182).

## Evidence (v0.4.8, live data @~3,219 sessions)

### Token gate (six surfaces)

- `--host` without an address → clear usage error, refuses to start.
- `--host 0.0.0.0` without `ATTNBOX_TOKEN` → refuses with the
  explicit privacy rationale (rounds 29/84 contract).
- With token on a non-loopback bind:
  - `/api/items` no token → **401**; wrong Bearer → **401**; correct
    Bearer → 200.
  - `/api/events?slim=1` no token → **401**; `?token=` query → 200.
  - `POST /api/ack` no token → **401**.
- Loopback-only bind stays tokenless by design (verified 200 without
  a token when bound to 127.0.0.1 without --host).

### Webhook storm guard (fresh sink, port pre-cleared per round-182
method note — two stale probe daemons from earlier rounds were found
and killed before starting)

- Daemon started with `ATTNBOX_WEBHOOK_URL` against a **16-item
  waiting stock**: sink received **0 POSTs at startup** — stock is
  never re-notified.
- 3-minute live window: 5 POSTs, each a genuinely new waiting
  transition (waiting count moved 16 → 18 with churn); each payload
  carried `event: "waiting"`, item id, and detail preview. No
  duplicates.

All probe daemons and the sink torn down; ports verified clear.

## Verdict

Rounds 29/84/71 contracts all hold. No P0/P1; docs-only, no
changeset.
