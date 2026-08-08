# GAP-ROUND-264 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 264. Driver dimension: real testing — PWA offline
last-known snapshot + SSE disconnect/reconnect resilience, first
since round-252.

## Evidence (v0.4.8, live daemon @~3,390 sessions, real Chrome)

```text
live view: 75 active cards · offline indicator: false
after daemon kill: 75 cards retained · offline indicator: true
cold open while down: 75 cards from snapshot · offline: true
after daemon restart: same never-refreshed page back live in
  ~5s — offline indicator cleared, cards live-updated (74)
```

All rounds 45/79/108/125 contracts hold: the open tab keeps its
last-known list and honestly flags offline, a cold open during
the outage restores the full snapshot from localStorage, and SSE
auto-reconnects within ~5s of restart (ties the fastest on
record) without any manual refresh. Restart was done from a
separate shell per the round-252 method note. Probe daemon
killed via listener PID, port 4926 verified clear, temp scripts
and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
