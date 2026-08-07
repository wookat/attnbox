# GAP-ROUND-163 — --host token 门禁 + webhook 复测（纯文档）

Round 163. Driver dimension: real testing — `--host` token gate and
waiting-webhook channel re-tested (first since round-141).

## Evidence (live daemon, v0.4.8)

Token gate (`--host 0.0.0.0` + `ATTNBOX_TOKEN`), six faces:

| Probe | Result |
|---|---|
| `/api/items` no token | 401 |
| `/api/items` bad bearer | 401 |
| `/api/items` good bearer | 200 |
| SSE no token | 401 |
| SSE `?token=` query | 200 |
| `/api/ack` POST no token / good token | 401 / 200 |

Loopback daemons stay token-free (`missing or invalid token` only on
the non-loopback bind) — rounds 29/84 contract intact.

Webhook (`ATTNBOX_WEBHOOK_URL` → local sink): startup with 16
pre-existing waiting items produced **0 POSTs** over a 3-minute
observation (waiting drifted 16→14, no new transitions in-window) —
round-71's storm guard holds: pre-existing waiting is never
re-announced. (Fresh-transition delivery was re-proven live in
round-157 via the shared seen-set path.)

Incidental: port-clearing pitfall (round-150) applied again — a stray
round-162 daemon on 4985 and an orphaned 4984 bind were cleared
before/during probing; second daemon exits cleanly with the
"port in use" message (good failure mode).

## Verdict

Security gate and webhook contracts all hold. No P0/P1; docs-only,
no changeset.
