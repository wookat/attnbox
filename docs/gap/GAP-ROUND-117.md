# GAP-ROUND-117 — 无障碍复审抓到激活 tab 徽章对比度违规（P1 已修）

Round 117. Driver dimension: visual/a11y re-audit — first axe pass
since round-102, now covering the *active* "Needs you" tab state
(previous audits ran with the default tab selected).

## Found

- Mobile light/dark, desktop grouped, reply panel: 0 violations —
  except one:
- **P1 (fixed)**: the waiting-count badge kept `text-amber-800`
  (light-theme color) when its parent tab became active — the active
  tab inverts to a dark `bg-zinc-900` in light mode, dropping the
  badge to **1.71:1** (axe `color-contrast`, serious; WCAG AA needs
  4.5:1). Every prior audit missed it because none selected the
  waiting tab before running axe.

## Fix

Badge colors now follow the tab state: active tabs render
`text-amber-300 dark:text-amber-800` (inverted with the tab), idle
tabs keep the original pair. Post-fix axe on the active tab in both
themes: 0 violations.

## Verdict

One P1 fixed in `apps/web` (ships in the CLI bundle → attnbox patch
changeset). 97 tests green.
