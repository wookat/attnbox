# GAP-ROUND-287 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 287. Driver dimension: real-world testing — PWA offline
last-known snapshot + SSE disconnect/reconnect resilience in
real Chrome, first since round-276.

## Evidence (v0.4.8, live daemon @~3,450 sessions, coordinated
READY-marker kill/restart protocol)

```text
live view:            80 active cards · offline indicator: false
after daemon kill:    81 cards retained · offline indicator: true
cold open while down: 81 cards from localStorage snapshot · offline: true
after daemon restart: same never-refreshed page back live within
                      a ~45s observation window — offline
                      indicator cleared, cards live (80)
```

(The 80→81 card delta across the kill boundary is the final SSE
update landing before the socket dropped — live churn, not a
snapshot defect.)

All four contracts hold: active cards survive a daemon kill with
an honest offline indicator, a cold open while the daemon is
down restores the last-known snapshot from localStorage, and the
never-refreshed page auto-recovers to live via SSE reconnection
after restart. Probe daemon killed/restarted via real listener
PIDs, port clear, temp script/logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
