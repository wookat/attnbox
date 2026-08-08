# GAP-ROUND-241 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 241. Driver dimension: real-world testing — PWA offline
snapshot + SSE disconnect/reconnect resilience, first since
round-230.

## Evidence (v0.4.8, live daemon @~3,300 sessions, real Chrome)

```text
live view: 82 active cards
kill daemon: 82 cards retained + offline indicator shown
cold open while daemon down: 82 cards restored from snapshot
  + offline indicator shown
daemon restart: auto reconnect in ~10s without refresh,
  82 cards live again
```

All rounds 45/79/125 contracts hold: kill keeps the last-known
list with an offline banner, a cold open with the daemon down
restores the slim snapshot from localStorage, and the SSE client
auto-reconnects (~10s, within the 5–15s historical envelope)
without a manual refresh. Probe daemon killed via listener PID,
port 4939 verified clear, temp script and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
