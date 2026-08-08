# GAP-ROUND-233 — 分诊全流程 UX 走查（纯文档）

Round 233. Driver dimension: triage UX walkthrough — search →
filter → ack all → un-ack + keyboard chain, first since
round-224.

## Evidence (v0.4.8, live daemon @~3,288 sessions, real Chrome)

```text
default view: 65 active cards · 0 full /api/items fetches
lazy search "devin": 3,288 hits · full fetch only on demand
negative search: 0 cards
Needs You: 13 cards
j + e ack: ledger 0 → 1 · e undo: ledger → 0
✓ all done: ledger 13 · API un-ack ({id, at:null}): ledger → 0
? help panel: visible
```

All round-145/154 contracts hold: the default view never
triggers a full fetch, search lazily loads the full set on
demand, keyboard ack round-trips exactly, batch ack + API un-ack
returns the ledger to zero, and the help panel opens on `?`.

Probe method note: the un-ack API contract is
`POST /api/ack {id, at: null}` — a probe that posts
`{acked: false}` is rejected by input validation (no `at`
field), so its "un-ack" silently does nothing and leaves ledger
residue (caught and cleaned this round; final ledger 0).

Cleanup: ledger restored to 0, daemon killed via listener PID,
port 4944 verified clear, temp script and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
