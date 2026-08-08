# GAP-ROUND-297 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 297. Driver dimension: real testing — PWA offline snapshot
+ SSE disconnect/reconnect resilience, first since round-287.

## Evidence (v0.4.8, live daemon @~3,466 sessions, real Chrome)

```text
live:                cards 65 · pill "live" · banner absent
kill daemon:         cards 65 retained · pill "offline" · amber banner shown
cold reopen (down):  snapshot restores 65 cards (no permanent skeleton)
restart daemon:      auto back to live in ~10 s, no refresh · banner cleared · 65 cards
```

All round-149 contracts hold: cards persist through daemon
death with the offline pill + "last known state" banner, a cold
open while the daemon is down restores the snapshot, and the
page returns to live automatically (~10 s, near the historical
best) once the daemon restarts.

Method note for the probe playbook: full-page-text regexes for
"offline/reconnect" are unreliable at dogfood scale — a session
card's own text contained `--offline`, which made the first run
report a false "never reconnected". Assert on the header
live/offline pill and the exact daemon-lost banner string
instead; the first run was discarded and re-run accordingly.

Probe daemon killed via listener PID, port clear, temp
scripts/logs removed.

## Verdict

No P0/P1; docs-only, no changeset.
