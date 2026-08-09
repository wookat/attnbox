# GAP-ROUND-334 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 334. Driver dimension: real-world testing — PWA offline
last-known snapshot plus SSE disconnect/auto-reconnect
resilience, first since round-320. Real Chrome/CDP against a
live probe daemon @3,606 sessions; offline assertions use the
precise header live/offline pill and daemon-lost banner
(round-297 method note). One invalid first probe run (daemon
not yet warm at first `goto`) was discarded and re-run per the
established practice.

## Evidence (v0.4.8)

```text
baseline:           79 cards · pill: live
kill daemon:        79 cards retained · pill: offline ·
                    daemon-lost banner: true
cold open (down):   79 cards restored from localStorage snapshot
restart daemon:     auto-reconnected to live in ~5s, no refresh
                    (ties fastest observed) · 78 cards (live churn)
```

All resilience contracts hold: no blank/skeleton screen while
down, snapshot-backed cold start, banner-signposted offline
state, automatic recovery. Probe daemons killed, port clear,
logs removed, zero stale probe tabs.

## Verdict

No P0/P1; docs-only, no changeset.
