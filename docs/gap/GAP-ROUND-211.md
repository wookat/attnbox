# GAP-ROUND-211 — 分诊全流程 UX 走查（纯文档）

Round 211. Driver dimension: UX walkthrough — full triage flow on
the live inbox (search → filter → ack all → un-ack + keyboard
chain), first since round-198.

## Evidence (v0.4.8, live daemon @~3,240 sessions, real Chrome)

```text
default view:            64 active cards · 0 full /api/items fetches
search "devin":          3,235 hits · exactly 1 lazy full fetch
negative search:         0 hits · no extra fetch
Needs You filter:        6 cards
j + e single ack:        acked 0 → 1 → (e again) 0
✓ all done:              acked entries 6
API-based undo (r198 法): acked entries → 0
? help panel:            visible, Esc closes
```

- Default state stays on slim SSE only — zero full fetches until
  search is actually used; lazy search fires exactly one.
- Single-item ack roundtrip via keyboard is exact against the
  daemon ledger.
- Bulk un-ack done via `/api/ack` per the round-198 method note
  (blind j/e loops are unreliable under re-sorting); ledger back to
  zero — no probe residue.
- Note: the "full fetch" counter includes only UI-originated
  requests; probe-side ledger reads were direct API calls.

## Verdict

All triage contracts hold. No P0/P1; docs-only, no changeset.
