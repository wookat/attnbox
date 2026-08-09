# GAP-ROUND-444 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 444. Driver dimension: PWA offline last-known
snapshot + SSE disconnect/reconnect resilience, first
since round-433. Fresh localStorage baseline per method
note; live/offline asserted via header pill + exact
banner text (not full-page regex). Live daemon @3,8xx
sessions.

## Evidence (v0.4.8)

```text
live baseline            → 80 cards
kill daemon              → 80 cards retained · offline pill
                           shown · disconnect banner shown
cold reopen (daemon down)→ 80 cards restored from
                           last-known snapshot
restart daemon           → original tab back to live in
                           ~10s, no refresh needed
final live state         → 80 cards
```

Probe daemon killed, port clear, zero residual tabs,
localStorage restored.

## Verdict

Offline snapshot and SSE auto-reconnect contracts all
hold. No P0/P1; docs-only, no changeset.
