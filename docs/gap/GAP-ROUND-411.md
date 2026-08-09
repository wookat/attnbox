# GAP-ROUND-411 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 411. Driver dimension: PWA offline snapshot + SSE
disconnect/reconnect resilience, first since round-400. Live
daemon @3,79x sessions, fresh localStorage.

## Evidence (v0.4.8)

```text
live baseline:      83 cards
daemon killed:      83 cards retained · offline indicator
                    shown
cold open (down):   83 cards restored from localStorage
                    snapshot, full shell
daemon restarted:   auto-reconnect without refresh in ~5s
post-reconnect:     82 cards (one live session finished
                    during the window — expected live-data
                    drift)
```

Probe daemon killed, port clear, temp files removed.

## Verdict

All offline/resilience contracts hold. No P0/P1; docs-only,
no changeset.
