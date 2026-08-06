# GAP-ROUND-36 — 默认视图信噪比：finished 会话折叠（106 → 25 张卡）

Round 36. Driver dimensions: user/data analysis (dogfood), UX walkthrough,
competitor model comparison.

## Evidence

Live dogfood dataset (106 real sessions): **81 of 106 (76%) are finished
(`done`) cloud sessions**. In the default "All" view they all render as full
cards below the actionable ones — a ~9,900px scroll where three quarters is
history, not attention. `attnbox ls` prints the same 114 lines.

Competitor models: GitHub notifications hides "Done" behind its own tab;
Linear archives resolved issues out of the inbox. Both keep the default
surface answerable ("what needs me / what is moving") without deleting
history.

## P1 — finished sessions drown the default view

Fix (web, `App.tsx`): in the ungrouped "All" view with no active search,
`done` sessions collapse behind a `Show N finished sessions` expander
(`aria-expanded`, dashed-border, toggles to `Hide …`). Waiting → working/idle
stay as-is; the Done tab, search, and grouped view are unchanged (search must
search everything; groups are already collapsible). Keyboard j/k order follows
what is actually rendered.

Verified live (real 106 sessions, programmatic walkthrough): default renders
25 cards + expander "Show 81 finished sessions"; expanding renders 106;
collapsing again restores 25; j/k selection ring works in both states.

## Non-goals recorded

- `attnbox ls` keeps listing everything (it is the explicit "list" command and
  has `--waiting` for the focused view) — no change.
- Grouped view already collapses per project; layering a second collapse there
  would be confusing.
