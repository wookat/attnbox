# GAP-ROUND-41 — 明亮主题：跟随系统 prefers-color-scheme

Round 41. Driver dimensions: frontend visual analysis, competitor comparison.

## Gap

The inbox was dark-only (`class="dark"` hardcoded, every Tailwind class
dark-tuned). Linear, GitHub, and every contemporary inbox-style product follow
the OS theme; a light-environment phone user got a glaring dark rectangle.
Modern visual language and mobile experience are hard acceptance requirements.

## Fix (P1)

Light-first restyle with `dark:` variants everywhere (Tailwind v4 media
strategy — follows `prefers-color-scheme` automatically, no toggle to sync):

- `index.css`: body `bg-white text-zinc-900 … dark:bg-zinc-950 dark:text-zinc-100`,
  `color-scheme: light dark` for native form controls/scrollbars;
- `index.html`: dropped the vestigial `class="dark"`, split `theme-color`
  meta per scheme (`#ffffff` light / `#09090b` dark);
- `App.tsx`: ~90 class instances remapped (secondary text zinc-400→zinc-600
  in light, borders 800→200, cards 900→100, accents *-300→*-700, amber label
  →amber-700 per the round-35 contrast lesson, active tab inverted chip).

## Evidence

- axe-core: **0 violations** in all four combinations (light/dark ×
  1280px/390px);
- amber accent initially mapped to amber-600 (3.2:1 — caught by axe, fixed
  to amber-700);
- screenshots of both themes attached to the PR.

## Honest boundary

No manual theme toggle: system preference only (same as GitHub's default
"sync with system" mode). A toggle is a P2 if real usage asks for it.
