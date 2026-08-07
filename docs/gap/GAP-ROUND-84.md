# GAP-ROUND-84 — `--host` token 门禁负例复测：安全面无回归（纯文档）

Round 84. Driver dimension: security negative-path testing — the
round-29 `--host` token gate had not been re-probed since several
releases of daemon/web changes (SSE gzip, ack persistence, webhook,
reply). Re-verified on the published v0.4.4.

## Probed (v0.4.4 from npm, `ATTNBOX_TOKEN` + `--host 0.0.0.0`)

- `GET /api/items` without token → **401**; with a wrong bearer →
  **401**; with the correct bearer → **200**.
- `POST /api/ack` without token → **401** (write path gated).
- `POST /api/reply` without token → **401** (the only outbound-write
  path gated).
- `GET /api/events?token=…` → SSE streams (query-token path for
  EventSource, which cannot set headers).
- `GET /` without token → **200** — static shell only; every data/API
  surface behind the gate. First visit uses `/?token=…` as documented.
- Bonus: bare `--host` without an address exits with a clear usage
  error instead of silently binding.

## Verdict

No P0/P1: all five API surfaces (items/events/ack/reply/static)
behave per the round-29 contract on current code. The transport
caveat (token ≠ TLS; prefer tailnet/VPN) remains documented in
LIMITS. No code change; no changeset.
