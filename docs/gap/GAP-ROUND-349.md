# GAP-ROUND-349 — 分诊全流程 UX 走查（纯文档）

Round 349. Driver dimension: full triage-flow UX re-walk
(search → filter → ack all → un-ack + keyboard chain), first
since round-339. Real Chrome/CDP against a live probe daemon
@3,652 sessions (largest to date; 17 waiting). Probe cleared
`attnbox:filter`/`attnbox:group` before measuring.

## Evidence (v0.4.8)

```text
default view:        0 full /api/items fetches (slim SSE only)
lazy search:         exactly 1 /api/items fetch on first query
negative search:     0 cards — honest empty state
keyboard j → e:      ack ledger 0 → 1 (asserted via ledger
                     transition per round-339 method note)
✓ all done:          17 items acked in one click
API un-ack loop:     ledger back to 0 ({id, at:null} contract)
? help panel:        visible, Escape closes
```

Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

All triage contracts hold at record scale. No P0/P1; docs-only,
no changeset.
