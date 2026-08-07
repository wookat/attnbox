# GAP-ROUND-121 — --host token 门禁 + webhook 通道复测（纯文档）

Round 121. Driver dimension: real testing — the security gate and the
webhook channel had not been re-walked since rounds 84/101; re-tested
on main @ v0.4.6 (14 waiting live at startup).

## Evidence (live daemon, `--host 0.0.0.0` + `ATTNBOX_TOKEN` + `ATTNBOX_WEBHOOK_URL` sink)

Token gate (round-29/84 contract):
- `/api/items` no token → 401; bad bearer → 401; good bearer → 200.
- `/api/events` no token → 401; bad query token → 401;
  `?token=<good>` → 200 `text/event-stream`.

Webhook (round-69/71 contract):
- 14 sessions already waiting at daemon startup → **0 POSTs** to the
  sink (new-transitions-only semantics hold).
- Real-transition exactly-once delivery was verified with a live
  probe in round-101; not re-burned this round (probe costs ACU, no
  code touched that path since).

## Verdict

No P0/P1; security and webhook contracts intact on v0.4.6.
Docs-only; no changeset.
