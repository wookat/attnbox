# GAP-ROUND-141 — --host 门禁 + webhook 通道复测（纯文档）

Round 141. Driver dimension: real-world testing — security-gate
negatives and webhook baseline (first since round-121), on v0.4.8.

## Evidence

Token gate (`--host 0.0.0.0` + `ATTNBOX_TOKEN`):

- No token → `/api/items`, `/api/events`, `/api/ack` all 401.
- Wrong bearer token → 401.
- Correct bearer token → 200.
- SSE query-token: `?token=<good>` streams slim events; `?token=wrong`
  → 401.
- Web root stays served (static shell needs no token; data calls are
  gated).
- CLI guard: bare `--host` without a bind address refuses with a
  usage hint rather than silently binding.

Webhook storm guard (`ATTNBOX_WEBHOOK_URL` → local capture server):

- Fresh daemon start against a live org with 12 pre-existing waiting
  sessions: **0 POSTs** across ~3 minutes (multiple collect ticks) —
  the rounds-69/71 contract holds (only transitions into waiting
  observed after baseline fire; no replay of existing backlog).

## Verdict

Both contracts hold on v0.4.8. No P0/P1; docs-only, no changeset.
