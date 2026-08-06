# GAP-ROUND-51 — light 主题遗留对比度违规（done 标签 + agent 徽章）

Round 51. Driver dimensions: frontend visual/a11y analysis, real testing.

## Evidence sweep

axe-core regression on the live grouped view (both themes, desktop +
mobile) after rounds 47–50:

- desktop-light: `color-contrast` serious violations —
  - `done` status label `text-sky-600` on the finished-card background:
    3.92:1 (needs 4.5:1);
  - agent badges on tinted backgrounds sat at the AA boundary:
    codex teal 4.48:1, claude-code orange 4.3:1.
- mobile-dark: 0 violations.

Round-41's light-theme audit missed these because finished cards were
collapsed out of the default view; the grouped view (round-46/47) renders
them expanded.

## Gap (P1)

WCAG AA is a stated bar (round-18/35 precedent) — light theme regressed
below it on real cards.

## Fix

Light-theme text steps one shade darker, dark theme untouched:
`done` label sky-600→700; agent badge text 700→800 (orange/teal/blue/
violet).

## Evidence after fix

axe on live grouped view: desktop-light 0 violations, mobile-dark 0.
`pnpm audit --prod` still clean. 85 tests green.

## Honest boundary

Contrast verified against the current palette only; future tint changes
need the same regression (axe scripts kept in the round archive).
