# GAP-ROUND-64 — SSE 带宽：1,000 会话下每 tab ~45MB/h（P1）

Round 64. Driver dimension: real testing / data analysis (post-pagination
wire cost).

## Evidence

3-minute live SSE measurement at 1,006 real sessions: 42 full-snapshot
broadcasts, **757 KB/min** (~45 MB/h) per open tab — every snapshot is
~330 KB of JSON rebroadcast whole whenever anything changes (Devin
`updated_at` churn makes that roughly every 4 s). A phone keeping the
PWA open would burn ~1 GB/day. P1 at this scale.

## Fix

Daemon now honors `Accept-Encoding: gzip`:

- `/api/events` wraps each connection in a per-client gzip stream with
  `Z_SYNC_FLUSH` per event, so EventSource decodes transparently and
  events still arrive immediately;
- `/api/items` responds with `gzipSync` when accepted;
- clients that don't advertise gzip get the identical uncompressed
  behavior (tested).

Measured after fix: **186 KB/min** on the same live data — 4× cut, and
the stream benefits further from the shared compression window as
snapshots repeat. Browser E2E confirms live updates still render.

## Honest boundary / not done

- Snapshots are still full-state; delta/patch events (or per-item
  updates) would cut another ~10× but change the SSE contract for any
  `/api/events` consumer — deferred until there's a real consumer beyond
  our own web UI, logged as P2.
- Broadcast frequency itself (changes every ~4 s from `updated_at`
  churn) is intentional: freshness is the product.
