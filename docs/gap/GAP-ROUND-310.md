# GAP-ROUND-310 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 310. Driver dimension: real testing — PWA offline
last-known snapshot + SSE disconnect/reconnect resilience,
first since round-297.

## Evidence (v0.4.8, live daemon @~3,550 sessions, real Chrome,
pill/banner exact-selector method per round-297 note)

```text
live:                cards 80 · pill "live" · banner absent
kill daemon:         cards 81 retained · pill "offline" · exact
                     daemon-lost banner shown
cold reopen (down):  snapshot restores 81 cards · pill "offline"
                     (no permanent skeleton)
restart daemon:      back to live in ~5 s, no refresh · banner
                     cleared · 82 cards (ties round-264 fastest)
```

All four contract legs hold: last-known state is preserved on
disconnect, the offline pill and the exact "Connection to the
attnbox daemon lost" banner appear, a cold open while the daemon
is down restores the snapshot instead of a skeleton, and the
page returns to live automatically (~5 s) once the daemon is
back. Card-count drift (80→81→82) is live dogfood churn, not a
defect.

Daemon restarted via independent detached shell (round-252
method note). Probe daemon killed via listener PID, port clear,
temp scripts/log removed, probe tabs closed per round-308 note.

## Verdict

No P0/P1; docs-only, no changeset.
