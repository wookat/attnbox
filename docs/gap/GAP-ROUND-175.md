# GAP-ROUND-175 — 分诊全流程 UX 走查（纯文档）

Round 175. Driver dimension: UX walk-through — full triage loop
re-walked on the live org (~3,135 sessions, first since round-166):
search → filter → keyboard chain → ack round-trips → ack all →
un-ack all → help dialog.

## Evidence (real browser via CDP, v0.4.8)

- Default view: 100 active cards, **0** initial full `/api/items`
  fetches (slim SSE holding).
- `/` search: done-scope search lazily triggers exactly 1 full
  fetch; a live-title term returns 1 hit; a non-existent term
  correctly returns 0 (verified both directions).
- Needs you filter: 19 waiting cards.
- Keyboard chain: `j` select → `e` ack (ledger 20→21) → `e` undo
  (21→20) — exact round-trip.
- `✓ all done`: acks the full needs-you set; un-ack-all restores the
  ledger to **0** — zero residue confirmed via `/api/items` `acked`
  map after cleanup.
- `?` help dialog: exactly 1 dialog, Escape closes.

Method note: an earlier probe misread ack state by looking for a
per-item `ackedAt` field — ack state lives in the top-level `acked`
map of `/api/items` (`{id: timestamp}`), not on items. The misread
also left 20 probe acks behind mid-walk; they were part of the
ledger counts above and fully cleared at the end.

## Verdict

All triage contracts hold. No P0/P1; docs-only, no changeset.
