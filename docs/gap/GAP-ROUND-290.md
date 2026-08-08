# GAP-ROUND-290 — 分诊全流程 UX 走查（纯文档）

Round 290. Driver dimension: UX walkthrough — full triage flow
in real Chrome (search → filter → ack all → un-ack + keyboard
chain), first since round-278.

## Evidence (v0.4.8, live daemon @3,452 sessions)

```text
default view:      78 active cards · app-driven full /api/items fetches: 0
search "devin":    3,452 cards · lazy full fetch exactly 1
negative search:   0 cards (honest empty state)
Needs You filter:  25 cards
ledger before:     0
j + e ack one:     ledger 1 · e undo: ledger 0
✓ all done:        ledger 25
API un-ack loop ({id, at:null}): ledger 0
help panel (?):    visible
```

All triage contracts hold: the default view stays on slim SSE
with zero app-driven full fetches, search lazily loads the done
backlog exactly once, a nonsense query yields an honest empty
state, keyboard ack round-trips (j/e, e undo), bulk `✓ all done`
acks the whole Needs You set (25), the API un-ack loop clears
the ledger to zero (no orphans), and the `?` help panel renders.
Filter localStorage cleared before the run per the round-185
note. Probe daemon killed via listener PID, port clear, temp
script/log removed.

## Verdict

No P0/P1; docs-only, no changeset.
