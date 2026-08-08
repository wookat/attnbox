# GAP-ROUND-258 — 分诊全流程 UX 走查（纯文档）

Round 258. Driver dimension: UX walkthrough — full triage flow
(search → filter → ack all → un-ack + keyboard chain), first
since round-246.

## Evidence (v0.4.8, live daemon @~3,380 sessions, real Chrome)

```text
default view: 88 active cards · app-driven full /api/items fetches: 0
search "devin": 3,376 cards · lazy full fetch exactly 1
negative search: 0 cards (honest empty)
Needs You filter: 24 cards
ledger before: 0
j+e ack one: ledger 1 · e undo: ledger 0
✓ all done: ledger 24 (all waiting acked in one click)
API un-ack cleanup ({id, at:null} loop): ledger 0
help panel (?): visible
```

All rounds 233/246 contracts hold: slim default view drives zero
full fetches, search lazily loads the full set exactly once,
j/e ack round-trips precisely, ✓ all done acks every waiting
item, and the `{id, at:null}` un-ack contract clears the ledger.
(The probe's own ledger-inspection `fetch()` calls also hit
`/api/items`; only app-driven fetches are counted above.) Probe
daemon killed via listener PID, port 4930 verified clear, temp
script and log removed, ledger left at zero.

## Verdict

No P0/P1; docs-only, no changeset.
