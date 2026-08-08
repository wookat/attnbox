# GAP-ROUND-209 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 209. Driver dimension: real-world testing — PWA offline
last-known snapshot + SSE disconnect/reconnect resilience (first
since round-195, slim build).

## Evidence (v0.4.8, live data, real Chrome, script-spawned daemon
with true PID per round-171 method note)

```text
live baseline:        64 active cards
daemon kill:          64 cards retained + offline indicator shown
cold reload offline:  64 cards restored from localStorage snapshot
daemon restart:       back live in ~5 s, no manual refresh, 64 cards
```

- Kill: list retained in place, offline indicator appears.
- Cold open while down: full active list restored from the slim
  offline snapshot (active items only, per design).
- Restart: SSE auto-reconnects and the offline indicator clears in
  ~5 s without any refresh — fastest recovery measured yet
  (round-195 was ~10 s, round-171 ~15 s).

Probe daemon spawned inside the script (own PID), killed at both
stages; port verified clear; temp script removed.

## Verdict

Offline + resilience contracts all hold on the slim build. No
P0/P1; docs-only, no changeset.
