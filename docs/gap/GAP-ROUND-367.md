# GAP-ROUND-367 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 367. Driver dimension: PWA offline snapshot + SSE
disconnect/reconnect resilience re-walk, first since round-356.
Real Chrome/CDP against a live probe daemon (~3,69x sessions);
`localStorage.clear()` + reload before baselining (round-356
method note); assertions on header live/offline pill + exact
banner copy (round-297 method note).

## Evidence (v0.4.8)

```text
baseline:        88 cards · live pill visible
kill daemon:     88 cards preserved · offline pill ·
                 "Connection to the attnbox daemon lost" banner
cold open:       88 cards restored from offline snapshot
                 (daemon still down)
restart daemon:  auto back to live without refresh in ~5s
```

Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

All offline/reconnect contracts hold. No P0/P1; docs-only, no
changeset.
