# GAP-ROUND-356 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 356. Driver dimension: PWA offline snapshot + SSE
disconnect/reconnect resilience re-walk, first since round-345.
Real Chrome/CDP against a live probe daemon (~3,6xx sessions);
offline assertions use the precise live/offline pill and
daemon-lost banner selectors; in-probe daemon kill via
`fuser -k <port>/tcp` per round-345 method note.

## Evidence (v0.4.8)

First run was invalidated by residual probe localStorage (a
leftover `attnbox:filter` from an earlier round made the
baseline show 3,571 cards incl. done, and the stale
`attnbox:snapshot` skewed cold-open). Method note: PWA/offline
probes must `localStorage.clear()` + reload before baselining —
now on file.

Clean run:

```text
baseline:        102 cards · live pill visible
kill daemon:     102 cards preserved · offline pill · daemon-lost banner
cold open:       102 cards restored from offline snapshot (daemon down)
restart daemon:  auto back to live without refresh in ~3s
                 (ties round-345 fastest record)
```

Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

All offline/reconnect contracts hold; one probe-hygiene method
note filed. No P0/P1; docs-only, no changeset.
