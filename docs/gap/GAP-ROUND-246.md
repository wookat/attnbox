# GAP-ROUND-246 — 分诊全流程 UX 走查（纯文档）

Round 246. Driver dimension: triage UX walkthrough — search →
filter → ack all → un-ack + keyboard chain, first since
round-233.

## Evidence (v0.4.8, live daemon @3,312 sessions, real Chrome)

```text
default view: 86 active cards · full /api/items fetches: 0
search "devin": 3,312 cards · lazy full fetch exactly 1
negative search: 0 cards (honest empty)
Needs You filter: 35 cards
ledger before: 0
j+e ack one: ledger 1 · e undo: ledger 0
✓ all done: ledger 35 (all waiting acked in one click)
API un-ack cleanup ({id, at:null} loop): ledger 0
help panel (?): visible
total full fetches whole run: 1
```

All rounds 125/198/233 contracts hold: default view stays slim
with zero full fetches, search lazily loads the full set exactly
once, batch ack and keyboard round-trip are exact, un-ack via
the `{id, at:null}` API contract clears the ledger to zero.
Probe daemon killed via listener PID, port 4937 verified clear,
temp script and log removed, ledger left at zero.

## Verdict

No P0/P1; docs-only, no changeset.
