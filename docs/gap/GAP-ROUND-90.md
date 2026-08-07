# GAP-ROUND-90 — ack 跨设备同步 + 重启持久化实机复测（纯文档）

Round 90. Driver dimension: real testing — the round-6 cross-device
ack sync and daemon-side ack persistence had not been re-exercised
since SSE gzip (round-64), ack hardening (round-27) and the 3k-scale
changes shipped.

## Probed (live inbox, ~2,890 sessions / 8 waiting)

- **Cross-tab sync over SSE**: two isolated browser contexts on the
  same daemon; `e` ack in tab A → tab B headline updated 8 → 7 within
  one SSE tick without reload; un-ack → both back to 8.
- **Restart persistence**: `POST /api/ack` for a real waiting item,
  daemon killed and restarted → ack still present in `/api/items`'
  `acked` map (state file reload works at current scale).
- **Un-ack contract**: `POST /api/ack {id, at: null}` removes the
  entry (verified gone from `acked`); test ack cleaned up after the
  probe.

## Verdict

No P0/P1: ack write path, SSE fan-out, persistence file and the
null-`at` removal contract all behave per rounds 6/27 semantics on
current code. No code change; no changeset.
