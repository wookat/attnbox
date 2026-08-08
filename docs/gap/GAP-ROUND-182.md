# GAP-ROUND-182 — --host token 门禁 + webhook 通道复测（纯文档）

Round 182. Driver dimension: real-world testing — `--host` bearer
token gate (six negative/positive faces) + `ATTNBOX_WEBHOOK_URL`
channel re-proven live (first since round-163).

## Token gate (daemon on 0.0.0.0 with ATTNBOX_TOKEN)

| Face | Result |
|---|---|
| `/api/items` no token | 401 |
| `/api/items` wrong token | 401 |
| `/api/items` bearer token | 200 |
| `/api/events` no token | 401 |
| `/api/events?token=…` query token | 200 |
| `POST /api/ack` no token | 401 |

All six exactly per the rounds 29/84 contract.

## Webhook channel (local sink, live org ~3,135 sessions)

Startup waiting stock 18 captured before observation; over a
3-minute window the sink received 6 POSTs. 5 were brand-new waiting
transitions (ids not in stock). 1 id was in the initial stock but
had fresh `lastActivityAt` between capture and POST — i.e. it went
waiting → non-waiting → waiting again, which correctly re-notifies
per the rounds 71/81 storm-guard contract (id leaves the notified
set only after an observed non-waiting). **0 false stock POSTs.**

Method note: a first attempt produced an unattributable POST list
because a leftover sink from the prior probe still held port 4899
(EADDRINUSE on the second sink, logs crossed). Re-ran with ports
verified clear and stock captured before the window — the same
port-exclusivity pitfall as round-149, now also applies to sinks.

Probe daemon and sink torn down; ports verified clear.

## Verdict

Security gate and webhook contracts all hold. No P0/P1; docs-only,
no changeset.
