# GAP-ROUND-31 — production benchmark loop, round 31

Date: 2026-08-05. Directive: deep re-benchmark against current competitor versions with a mobile-UX and modern-visual-design focus.

## Re-tested

- **ccmux** at `616126e` (2026-08-05): 30 commits since our round-22 review — session handoff (`ccmux handoff`), transcript readers (`ccmux last`), full Worktrees panel, tmux-server selection. All tmux-orchestration features outside our passive-inbox scope; no new attention-surface ideas to borrow this round.
- **Omnigent** 0.8.2 (round-30 install still current — released same day): inbox still empty-state only for non-Omnigent-run sessions; no delta.
- **Our own inbox** on the live daemon (104 real sessions, 13 waiting), desktop 1440×900 + mobile 390×844, screenshot-by-screenshot against Linear/GitHub-mobile conventions.

## Findings (our UX)

| # | Finding | Severity |
|---|---|---|
| 1 | **Mobile: search + filter tabs scroll away.** After scrolling into a 100-session list there is no way to switch filter or search without scrolling back to the top. Linear/GitHub mobile keep the toolbar pinned. | P1 |
| 2 | **Mobile: one-line title truncation.** CJK/long titles lose their meaning at ~14 chars; the title is the primary decision signal. | P1 |
| 3 | Card action buttons (↩ ✓ ↗) visually heavy on mobile | P2 — acceptable at 28px tap targets; unchanged |

## Fix

- Search input + filter tabs wrapped in a `sticky top-14` toolbar with backdrop blur (header fixed to `h-14` so the offset is exact). Works with the existing sticky header; grouped/filters/search now reachable anywhere in the list.
- Title: `truncate` → `line-clamp-2 sm:line-clamp-1` — two lines on phones, unchanged on desktop.

## Evidence

Before/after screenshots on the live daemon (mobile top + scrolled + desktop). axe-core after the change: 0 violations on both viewports. Quality gates green, 80 tests.

## Honest assessment

With pinned toolbar + two-line titles, the mobile inbox now matches the triage ergonomics of GitHub notifications mobile for our scope. Still worse than competitors: no native app (agent-dashboard PWA parity holds), no in-inbox local-agent actions (by design — read-only), Omnigent's richer per-session takeover (out of scope).

## Carried gaps

Unchanged: Gemini key; Cursor login (requested); Copilot; macOS; heuristic FP/FN quantification.
