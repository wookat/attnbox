# GAP-ROUND-378 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 378. Driver dimension: PWA offline snapshot + SSE
disconnect/reconnect resilience re-walk, first since
round-367. Real Chrome/CDP against a live probe daemon;
localStorage cleared before baselining (standing method note).

## Evidence (v0.4.8)

```text
baseline:        71 cards · live pill visible
kill daemon:     71 cards preserved · offline pill ·
                 "Connection to the attnbox daemon lost" banner
cold open:       71 cards restored from offline snapshot
restart daemon:  same tab back to live pill without any page
                 refresh (verified post-restart: live=true,
                 offline=false, cards rendered)
```

Method note: the first reconnect-polling probe run hung inside
the Playwright CDP connection while ~26 accumulated `sw.js`
service-worker targets were registered on the shared browser —
the reconnect itself had already succeeded, re-verified via a
fresh connection. Probe daemon killed, port clear, zero stale
probe tabs.

## Verdict

Offline snapshot, cold-open restore, disconnect indicators, and
automatic SSE recovery all hold. No P0/P1; docs-only, no
changeset.
