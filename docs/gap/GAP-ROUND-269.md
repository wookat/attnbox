# GAP-ROUND-269 — 分诊全流程 UX 走查（纯文档）

Round 269. Driver dimension: UX walkthrough — full triage flow
re-run on the live inbox (search → filter → ack all → un-ack +
keyboard chain), first since round-258.

## Evidence (v0.4.8, live daemon @~3,400 sessions, real Chrome)

```text
default view: 69 active cards · app-driven full /api/items fetches: 0
search "devin": 3,397 cards · lazy full fetch exactly 1
  (re-verified with a clean isolated probe: 1 GET, +59 ms after typing)
negative search: 0 cards (honest empty)
Needs You filter: 16 cards
ledger before: 0
j+e ack one: ledger 1 · e undo: ledger 0
✓ all done: ledger 16
API un-ack cleanup ({id, at:null} loop): ledger 0
help panel (?): visible
```

All triage contracts hold: default view stays slim (zero full
fetches), search lazily loads the full list exactly once,
keyboard ack round-trips precisely, bulk ack + API un-ack
restore a clean ledger, and the shortcut help panel opens.
Ledger verified 0 at exit; probe daemon killed via listener PID,
port 4924 clear, temp scripts and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
