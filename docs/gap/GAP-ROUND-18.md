# GAP-ROUND-18 — production benchmark loop, round 18

Date: 2026-08-05. Reference: **WCAG 2.1 AA via axe-core 4** (the accessibility bar Linear/GitHub meet; a11y is an explicit acceptance criterion for this company). First automated audit of the live inbox.

## Audit (real daemon, 104 real sessions, desktop 1280×900 + mobile 390×844)

One violation class, `serious`: **color-contrast**, ~220 nodes per viewport. All secondary text used `text-zinc-500` (#71717b, ratio 4.12 on the page background — under the 4.5:1 AA minimum for normal text, worse on tinted waiting cards at 3.99–3.08) or `text-zinc-600` (#52525c, 2.48–2.57 — project lines, footer, group counts).

| # | Standard | attnbox today | Priority |
|---|---|---|---|
| 1 | AA 4.5:1 for normal text | meta rows 4.12, badges 3.08, project/footer 2.5 | **P0** |

## Round-18 fix

All secondary text lifted to `text-zinc-400` (#a1a1aa, ≥ 8:1 on every background used). Borders, dots, placeholders and hover targets unchanged. Re-audit: **0 violations** on both viewports.

## Regression verdict

Inbox now passes axe-core clean at desktop and mobile; visual hierarchy preserved (weight/size still differentiates, color no longer under-contrasts). Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY, heuristic misjudgment quantification).
