# GAP-ROUND-171 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 171. Driver dimension: real testing — offline last-known
snapshot and SSE disconnect/reconnect resilience re-walked on the
v0.4.8 slim build (first since round-149), live org ~3,130 sessions.

## Evidence (real browser via CDP)

1. Live baseline: 100 active cards, live badge visible.
2. Daemon killed mid-session: card list retained (100), offline
   banner appears — no blanking, no error storm.
3. Cold reload while daemon still down: 100 cards restored from the
   localStorage last-known snapshot (slim boundary: active items
   only, as documented), offline banner present.
4. Daemon restarted: page auto-recovers to live in ~15 s without any
   reload, list back on the live stream (100 cards).

Method note: the first probe run misread recovery as failed — the
harness's restart guard matched its own wrapper process via
`pgrep -f`, so the daemon was never actually restarted. Re-ran with
an explicit spawn; recovery passed. (Same family as the round-149
port-clearing pitfall: process-matching in probes must target the
exact daemon command line.)

## Verdict

Offline snapshot + SSE resilience contracts all hold on the slim
build. No P0/P1; docs-only, no changeset.
