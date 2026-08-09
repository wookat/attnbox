# GAP-ROUND-383 — 分诊全流程 UX 走查（纯文档）

Round 383. Driver dimension: full triage-flow UX re-walk
(search → filter → ack all → reverse-ack + keyboard chain),
first since round-372. Real Chrome/CDP against a live probe
daemon @3,740 sessions; localStorage cleared before baselining.

## Evidence (v0.4.8)

```text
default state:    0 /api/items fetches over idle window
                  (slim SSE only)
lazy search:      exactly 1 /api/items fetch on first query
negative search:  honest empty state (no phantom cards)
keyboard chain:   j select → e ack (ledger 0→1) →
                  API un-ack {id, at:null} back to 0
✓ all done:       19 items acked in one action
API reverse-ack:  ledger drained 19 → 0 (top-level acked map)
? help panel:     opens and lists shortcuts
```

Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

All triage-flow contracts hold at the largest scale walked to
date. No P0/P1; docs-only, no changeset.
