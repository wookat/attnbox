# GAP-ROUND-320 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 320. Driver dimension: PWA offline snapshot plus SSE
disconnect/reconnect resilience re-walk, first since round-310.
Real Chrome/CDP against a live probe daemon; offline assertions
use the exact header pill / daemon-lost banner selectors
(round-297 method note).

## Evidence (v0.4.8, live org @3,576 sessions · 24 waiting)

```text
baseline:            83 cards · pill "live"
kill daemon:         83 cards retained · pill "offline" ·
                     daemon-lost banner shown
cold open while down: 83 cards restored from the offline snapshot
                     (no permanent skeleton)
restart daemon:      auto-reconnected to "live" in ~5 s with no
                     manual refresh (ties the fastest recorded)
post-reconnect:      82 cards (one real session transitioned
                     during the window — live data, expected)
```

All four contracts hold: last-known state retained on daemon
loss with honest offline indication, cold-start snapshot
recovery, and refresh-free SSE auto-reconnect. Probe daemon
killed, port clear, temp script/log removed, zero stale tabs.

## Verdict

No P0/P1; docs-only, no changeset.
