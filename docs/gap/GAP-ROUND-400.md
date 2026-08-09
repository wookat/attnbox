# GAP-ROUND-400 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 400. Driver dimension: PWA offline snapshot + SSE
disconnect/reconnect resilience, first since round-389. Live
daemon @3,76x sessions, fresh localStorage baseline.

## Evidence (v0.4.8)

```text
baseline:      67 live cards
daemon killed: 67 cards retained · offline indicator +
               daemon-lost banner shown
cold open
while down:    67 cards restored from offline snapshot
restart:       same tab returned live without refresh in
               ~10s · 66 cards (one session finished during
               the window — live data, expected drift)
```

Probe daemon killed, port clear, zero stale tabs, temp
scripts removed.

## Verdict

Offline snapshot and SSE auto-reconnect contracts all hold.
No P0/P1; docs-only, no changeset.
