# GAP-ROUND-62 — 移动端分组头触控目标过小（P1）

Round 62. Driver dimension: mobile UX walkthrough at post-pagination
scale (1,006 sessions / 65 groups, 390×844 real screenshots).

## Evidence

Group headers — the primary interaction in grouped mode on a phone
(collapse what you don't care about, 65 of them) — measured **16 px
tall**: well under the WCAG 2.2 AA minimum target size (24×24 px) and
Apple/Google's 44/48 px guidance. Mis-taps land on the adjacent header
or the first card of the group.

## Fix

Added vertical padding to the header button (`py-1.5`, `mb-2`→`mb-1` to
keep rhythm): measured height after fix **28 px** — above the WCAG 2.2
minimum while keeping the compact label look. Desktop rendering
unchanged in kind (slightly more breathing room).

## Checked, no new issues

- Default mobile view at 1,006 sessions renders 42 cards; sticky
  toolbar, two-line titles, waiting previews all correct (screenshots
  `/tmp/r62-mobile-default.png`, `/tmp/r62b-mobile-grouped.png`).
- Collapse persistence + keyboard order behave in grouped mobile view.

## P2 (logged, not fixed)

Grouped view intentionally shows everything, so at 65 groups the full
scroll is long on a phone; finished-per-group collapsing would change
the "grouped shows everything" contract and needs design thought before
touching.
