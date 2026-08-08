# GAP-ROUND-276 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 276. Driver dimension: real testing — PWA offline snapshot
+ SSE disconnect/reconnect resilience, first since round-264.

## Evidence (v0.4.8, live daemon @~3,410 sessions, real Chrome)

```text
live view:                66 active cards · offline indicator: false
after daemon kill:        66 cards retained · offline indicator: true
cold open while down:     66 cards from snapshot · offline: true
after daemon restart:     same never-refreshed page back live
                          within a ~35s observation window —
                          offline indicator cleared, cards live
```

All resilience contracts hold: killing the daemon keeps the full
card set with an honest offline indicator, a cold open during
the outage restores the last-known snapshot from localStorage,
and the never-refreshed page auto-recovers via SSE reconnect
after restart with no manual reload. Method note: the first
probe run was discarded — its kill/restart steps never executed
(script-side waits without coordinating the external daemon);
re-run with a coordinated kill-on-READY marker protocol. Probe
daemon killed via listener PID, port clear, temp script/logs
removed.

## Verdict

No P0/P1; docs-only, no changeset.
