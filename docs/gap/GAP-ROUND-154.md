# GAP-ROUND-154 — 分诊全流程 UX 走查（纯文档）

Round 154. Driver dimension: UX walk-through — full triage loop
re-walked (first since round-145) on v0.4.8 against the live org
(~3,090 sessions, 13–15 waiting).

## Evidence (real browser via CDP)

- Default view: 91 active cards, 0 full fetches on load (slim).
- `j` → exactly one selection ring; `?` → help dialog opens.
- Search: done-only title (`ROUND-137` probe session) found — one
  lazy `/api/items` fetch, 1 hit, upper/lowercase both match;
  `reply-in-place probe` finds 2. Done tab lazily renders 2,990
  cards on one fetch.
- Ack round-trip: `e` acks the selected card (toggle flips to "Mark
  as unhandled"), `e` again restores.
- `✓ all done`: 15 waiting acked at once; un-acked one-by-one via
  card toggles. Two sessions left the visible list mid-probe (live
  org churn) — their ledger entries were cleared via `/api/ack`
  `at: null`; final ack ledger 0 entries, zero residue.
- Observation (not a defect): during a heavy-churn window an early
  search probe transiently rendered 0 hits while `summary.total`
  drifted (the drift-invalidate path refetches done items); repeated
  runs on a fresh page consistently return the hit. Watch item only —
  if reproducible sustained (not transient), promote to defect.

## Verdict

Triage loop contracts all hold. No P0/P1; docs-only, no changeset.
