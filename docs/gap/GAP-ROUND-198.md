# GAP-ROUND-198 — 分诊全流程 UX 走查（纯文档）

Round 198. Driver dimension: UX walkthrough — full triage flow
re-walk (first since round-185): search → filter → ack all → un-ack
+ keyboard chain, on the live slim build.

## Evidence (v0.4.8, live daemon @~3,203 sessions, real Chrome)

- Default view: 90 active cards, **0 full `/api/items` fetches** —
  slim SSE contract holds.
- Lazy search: `/` + "devin" triggered **exactly one** `/api/items`
  fetch and matched 3,203 sessions; negative query "zzzznotfound"
  → 0 hits with **no extra fetch** (cached); whole run stayed at 1
  full fetch.
- Needs You: 20 cards; `j` select + `e` ack → ledger 1 entry; `e`
  again → back to 0. Exact roundtrip.
- `✓ all done`: 18 entries written at once; un-ack path verified
  (probe cleanup restored ledger to 0 — confirmed via `/api/ack`).
  Method note: undoing many acks via a blind `j`+`e` keyboard loop
  is unreliable because the Needs You list re-orders as items
  un-ack — per-item `e` works, bulk undo probes should use the API
  or click per card.
- `?` help panel opens and Escape closes.

Probe daemon torn down; ack ledger verified 0; port clear; temp
script removed.

## Verdict

All triage contracts hold. No P0/P1; docs-only, no changeset.
