# GAP-ROUND-87 — 视觉/性能复测 + 官网 inbox 页补 ls 时长与行动链接（纯文档）

Round 87. Driver dimension: frontend visual analysis after the
rounds 79/81/86 changes landed and shipped.

## Re-measured (live inbox, 2,883 sessions / 7 waiting)

- Lighthouse (mobile profile, same Chromium/method as round-79):
  **perf 84 / a11y 100 / best-practices 100**, LCP 3.5 s, TBT 250 ms,
  CLS 0.066 — round-79 gains hold on main; no regression from
  rounds 81/86.
- Visual walkthrough screenshots (mobile-light 390×844, desktop-dark
  1440×900): waiting cards render age, attention label, agent badge,
  reply/ack/open affordances correctly in both themes; no clipping or
  contrast artifacts spotted.

## Docs drift found

The site inbox page described the `ls` preview line but predated
round-74 (action links) and round-86 (waiting age). One sentence
updated; all other pages checked — no drift.

## Verdict

No new P0/P1. Remaining mobile-perf gap to 90+ stays the round-79 P2
(delta SSE / virtualization, unchanged trigger). Docs-only change; no
changeset.
