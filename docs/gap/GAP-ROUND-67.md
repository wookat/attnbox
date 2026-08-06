# GAP-ROUND-67 — PR 次级链接的键盘可达性（`p` 快捷键）

Round 67. Driver dimension: UX walkthrough (keyboard parity after
round-63).

## Evidence

The inbox's triage model is keyboard-first (`j`/`k`/`Enter`/`e`/`r`),
but the round-63 "PR ↗" chip was pointer-only from the selection flow:
a keyboard user on a selected waiting card had no way to open its PR
without tabbing away from the `j`/`k` selection. Same parity gap class
as round-56's grouped-order fix.

## Fix

`p` opens `prUrl` of the selected item (no-op when it has none), wired
through the same guarded key handler (ignored while typing in inputs/
textareas, no modifier combos). Shortcut added to the `?` help panel
and the site keyboard table.

Verified live: `j` then `p` opened the selected waiting card's PR in a
new tab; typing "p" into search opens nothing.

## Checked, no further gaps

- `e`/`r`/`Enter` semantics unchanged; notification deep links
  unchanged (still the session for waiting items).
- doctor / CLI unaffected (`--json` already carries `prUrl`).
