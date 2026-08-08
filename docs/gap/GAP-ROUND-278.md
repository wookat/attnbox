# GAP-ROUND-278 — 分诊全流程 UX 走查（纯文档）

Round 278. Driver dimension: UX walkthrough — full triage
sequence in real Chrome (search → filter → ack all → un-ack +
keyboard chain), first since round-269.

## Evidence (v0.4.8, live daemon @~3,415 sessions)

```text
default view:      58 active cards · app-driven full /api/items fetches: 0
search "devin":    3,412 cards · lazy full fetch exactly 1
negative search:   0 cards (honest empty state)
Needs You filter:  8 cards
ledger before:     0
j + e ack one:     ledger 1 · e undo: ledger 0
✓ all done:        ledger 8
API un-ack loop ({id, at:null}): ledger 0
help panel (?):    visible
```

All triage contracts hold: the default slim view issues zero
full-list fetches, search lazily loads the done set exactly
once, the negative search shows an honest empty state, the
keyboard ack round-trip is exact, bulk ack covers the full
Needs-You set, and the documented API un-ack contract restores a
clean ledger. Probe daemon killed via listener PID, port clear,
temp script/log removed, ledger left at zero.

## Verdict

No P0/P1; docs-only, no changeset.
