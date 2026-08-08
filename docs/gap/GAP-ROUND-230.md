# GAP-ROUND-230 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 230. Driver dimension: real testing — PWA offline snapshot
+ SSE disconnect/reconnect resilience, first since round-209.

## Evidence (v0.4.8, live daemon @~3,270 sessions, real Chrome)

```text
live view: 74 active cards
kill daemon: 74 cards retained + offline indicator shown
cold open while daemon down: 74 cards restored from snapshot
  + offline indicator shown
daemon restart: auto reconnect in ~5s without refresh,
  74 cards live again
```

All rounds 45/108/125 contracts hold on the slim build: the list
never blanks on disconnect, the last-known snapshot restores on a
cold open with the daemon down, and SSE auto-reconnects without a
manual refresh (~5s, matching the round-209 best). Probe daemon
killed via listener PID, port 4946 verified clear, temp script
and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
