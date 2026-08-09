# GAP-ROUND-372 — 分诊全流程 UX 走查（纯文档）

Round 372. Driver dimension: full triage-flow UX re-walk
(search → filter → ack all → un-ack + keyboard chain), first
since round-361. Real Chrome/CDP against a live probe daemon
(~3,70x sessions). localStorage cleared before baselining
(round-356 method note); ack assertions via ledger transitions
(round-339 method note).

## Evidence (v0.4.8)

```text
default view:        0 full /api/items fetches (slim SSE only)
lazy search:         exactly 1 /api/items fetch on first query
negative search:     0 cards — honest empty state
keyboard j → e:      ack ledger 0 → 1
✓ all done:          6 items acked in one click
API un-ack loop:     ledger back to 0 ({id, at:null} contract)
? help panel:        visible, Escape closes
```

Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

All triage contracts hold. No P0/P1; docs-only, no changeset.
