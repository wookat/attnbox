# GAP-ROUND-65 — Lighthouse 复测抓到 round-63 三处无障碍回归

Round 65. Driver dimension: frontend visual/a11y re-audit after rounds
62–64.

## Evidence

Lighthouse on the live inbox (1,006 sessions): perf 92 / **a11y 91** /
bp 100 / seo 100, CLS 0.08, TBT 30 ms. a11y dropped from 100 with three
audits failing, all traceable to the round-63 "PR ↗" chip plus one
latent badge:

1. `label-content-name-mismatch` — the chip's `aria-label="Open the
   pull request"` didn't contain its visible text "PR", breaking
   voice-control users ("click PR" wouldn't match).
2. `target-size` — the chip was under the 24px minimum (same class of
   bug as round-62's group headers).
3. `color-contrast` — the amber waiting-count badge (`text-amber-700`
   on `amber-500/20`) fell below AA in light theme; round-51's sweep
   missed it because the badge only renders with unacked waiting items.

## Fix

- `aria-label="PR — open the pull request"` (starts with the visible
  text), `min-h-6 px-2` for the target size;
- badge text `amber-700` → `amber-800` in light theme (dark unchanged).

Re-measured after fix: perf 94 / **a11y 100**.

## Competitor note

ccmux's latest commit is still the skills split (`#128`, no
attention-surface change); Omnigent's latest release is still v0.8.1
(2026-08-03). No new inbox-shaped entrants found.

## Process note

Two of three regressions came from a feature added *two rounds ago* —
a11y audits need to run in the same round as any new interactive
element, not on a lagging cadence.
