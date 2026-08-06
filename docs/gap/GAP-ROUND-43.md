# GAP-ROUND-43 — 手动主题切换（system / light / dark）

Round 43. Driver dimensions: real testing (Lighthouse), UX walkthrough,
competitor comparison.

## Evidence sweep

- Post-round-41/42 Lighthouse regression on the live inbox (106 sessions):
  perf 94 / a11y 100 / best-practices 100 / SEO 100, CLS 0.076, TBT 20ms —
  no regression from the theme/help work.
- `pnpm audit --prod`: still clean, but pnpm 11 now **ignores
  `package.json#pnpm.overrides`** (warning on every install) — the round-40
  sharp override was only holding via the lockfile pin.

## Gap (P1)

Round-41 shipped system-preference-only theming and honestly recorded the
manual toggle as a P2. But GitHub, Linear, and effectively every product we
benchmark offer a manual override on top of "sync with system" — a user
whose OS is dark but who wants a light inbox (or vice versa) had no
recourse. Promoted to this round's fix.

## Fix

- Tailwind `dark:` switched from media strategy to class strategy
  (`@custom-variant dark (&:where(.dark, .dark *))`), default still follows
  the system: a pre-paint inline script in `index.html` reads
  `attnbox:theme` and applies `.dark` before first render (no FOUC);
- header gains a ◐/☀/☾ button cycling system → light → dark, persisted in
  `localStorage`, `theme-color` meta updated live, `matchMedia` listener
  keeps "system" mode reactive to OS changes;
- moved the sharp override to `pnpm-workspace.yaml#overrides` (the location
  pnpm 11 actually reads) so the round-40 fix survives future installs.

## Evidence after fix

- Programmatic walkthrough (dark OS context): system→dark, 1 click→light
  (white bg), 2 clicks→dark, reload persists, meta `#09090b`, back to
  system; forced-light-on-dark-OS axe: 0 violations; fresh light-OS context
  with saved `dark` renders dark immediately (pre-paint script works).
- `pnpm install` no longer warns; audit still clean.

## Honest boundary

The toggle is per-browser (localStorage), not synced across devices — same
as GitHub. Acked-state sync via the daemon exists; theme sync is not worth
the coupling.
