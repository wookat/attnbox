# GAP-ROUND-185 — 分诊全流程 UX 走查（纯文档）

Round 185. Driver dimension: UX walkthrough — full triage flow
re-walked in the real browser against a live daemon @~3,166
sessions (first since round-175).

## Evidence (v0.4.8 web)

- Default view: 89 active cards, **0** initial full `/api/items`
  fetches (slim SSE only). Note: first load rendered 16 cards
  because the round-175 probe's "waiting" filter had persisted in
  localStorage — filter persistence working as designed, reset
  restored the full active view.
- Lazy search: querying triggers exactly one `/api/items` fetch;
  "毕业论文" hits 3 (positive), a stale finished title hits 0
  (negative) — both correct against the live crawl.
- Needs You filter: 16 waiting cards, matching the live waiting set.
- Keyboard triage: `j` selects, `e` acks (top-level `acked` map
  0→1), `e` again undoes (1→0).
- `✓ all done`: 16 waiting acked in one action; API cleanup
  restored the ledger to 0 — zero residue.
- `?` opens exactly one help dialog; Escape closes it.

Probe daemon torn down; port verified clear.

## Verdict

Full triage contract holds. No P0/P1; docs-only, no changeset.
