# GAP-ROUND-345 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 345. Driver dimension: PWA offline snapshot + SSE
disconnect/reconnect resilience re-walk, first since round-334.
Real Chrome/CDP probe against a live probe daemon (~3,6xx
sessions); offline assertions use the precise live/offline pill
and daemon-lost banner selectors per standing method.

## Evidence (v0.4.8)

```text
baseline:        74 cards · live pill visible
kill daemon:     74 cards preserved · offline pill · daemon-lost banner
cold open:       74 cards from offline snapshot (daemon still down)
restart daemon:  auto back to live without refresh in ~3s
                 (fastest observed to date; previous best ~5s)
```

Method note: killing the probe daemon inside the probe via
`pkill -f "port <n>"` self-terminates the spawning shell (the
`sh -c` cmdline matches the pattern) — use `fuser -k <port>/tcp`
instead. First probe attempt aborted for this reason and was rerun
cleanly. Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

All offline/SSE resilience contracts hold. No P0/P1; docs-only,
no changeset.
