# GAP-ROUND-477 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 477. Driver dimension: PWA offline snapshot +
SSE disconnect/reconnect resilience re-walk, first
since round-466. Probe daemon on port 4989, clean
localStorage, live data.

## Evidence (v0.4.8, main)

```text
live view       → 74 cards
daemon killed   → 74 cards retained + offline
                  indicator shown
cold open while
daemon down     → 74 cards restored from last-known
                  snapshot (no permanent skeleton)
daemon restart  → auto-reconnect without refresh,
                  wall-clock ~10s; 74 cards live
                  again
```

Note: this restart reconnect was ~10s because the
kill/restart happened after the previous daemon had
fully crawled — the SSE retry landed as soon as the
new daemon's port opened. Round-466's ~58s included
a fresh daemon's ~45s initial crawl; both are
consistent with the same contract.

Cleanup: port 4989 clear, temp script/logs removed,
residual CDP pages closed to 0.

## Verdict

Offline snapshot + SSE resilience contracts all
hold. No P0/P1; docs-only, no changeset.
