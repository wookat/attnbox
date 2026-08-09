# GAP-ROUND-427 — 分诊全流程 UX 走查（纯文档）

Round 427. Driver dimension: full triage-flow UX walk
(search → filter → ack all → un-ack + keyboard chain),
first since round-416. Live daemon @3,83x sessions
(largest to date), fresh localStorage baseline.

## Evidence (v0.4.8)

```text
default state          → 72 cards · 0 full /api/items fetches
lazy search "review"   → 17 hits · exactly 1 /api/items fetch
negative search        → 0 cards · honest empty surface
j → e ack round-trip   → acked 1 → un-ack back to 0
? help panel           → visible, Escape closes
✓ all done             → 18 items into acked ledger
API un-ack sweep       → {id, at:null} loop → acked map 0
```

Probe daemon killed, port clear, zero residual tabs,
localStorage restored.

## Verdict

All triage contracts hold at the largest-yet dogfood scale.
No P0/P1; docs-only, no changeset.
