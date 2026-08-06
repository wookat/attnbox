# GAP-ROUND-56 — 分组视图键盘导航顺序错位

Round 56. Driver dimension: UX walkthrough (keyboard triage flow).

## Evidence（实机 106 会话，Playwright 走查）

In grouped view, `j`/`k` selection order was still the flat list order,
not the on-screen order: pressing `j` 12 times visited an item
(`devin-279691…`) that is not among the first 12 cards in the DOM, and
skipped the visible 10th card. Root cause: `ordered` (the keyboard walk
list) was `[...waiting, ...listed]` regardless of the grouped toggle,
while the grouped render sorts groups by activity (round-47) and hides
collapsed groups.

## Classification

P1 — keyboard-first triage is a core promise (`j/k/e/r/Enter`); selection
jumping to off-screen/hidden cards breaks it exactly in the power-user
path.

## Fix

`ordered` now mirrors the screen when grouped: waiting section first,
then groups in their rendered order, skipping collapsed groups.

## Evidence after fix

Same walkthrough: 12 `j` presses visit exactly the first 12 DOM cards
(`matches-dom-order: true`). Collapsed groups are skipped by
construction. 85 tests green.

## Honest boundary

Selection is not preserved across toggling the grouped view (selection
index resets contextually) — unchanged existing behavior, P2.
