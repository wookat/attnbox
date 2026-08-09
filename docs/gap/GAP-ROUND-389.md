# GAP-ROUND-389 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 389. Driver dimension: PWA offline snapshot + SSE
disconnect/reconnect resilience re-walk, first since
round-378. Live probe daemon @3,74x sessions; localStorage
cleared before baselining per the standing method.

## Evidence (v0.4.8)

```text
baseline:           73 cards · live pill on
daemon killed:      73 cards retained · offline indicator on ·
                    daemon-lost banner shown
cold open (down):   73 cards restored from last-known snapshot
daemon restarted:   same tab back to live WITHOUT refresh in
                    ~5 s (ties round-367; record ~3 s rounds
                    345/356) · 73 cards intact
```

Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

All offline-snapshot and SSE-reconnect contracts hold. No
P0/P1; docs-only, no changeset.
