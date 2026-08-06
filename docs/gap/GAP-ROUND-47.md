# GAP-ROUND-47 — grouped 视图排序与语义（round-46 之后的走查）

Round 47. Driver dimensions: real testing, UX walkthrough.

## Evidence sweep

Live walkthrough of the ⊞ grouped view right after round-46 shipped real
project attribution (14 groups on the dogfood dataset):

- group order was **insertion order** — effectively random: the 41-item
  `(devin)` fallback bucket sat in the middle of real repos, actives and
  dormant repos interleaved;
- group header expanders had no `aria-expanded`, so screen readers got a
  button with no state.

## Gap (P1)

With one flat bucket (pre-round-46) ordering didn't matter; with 14 real
groups it does — competitors' project sidebars (Linear, GitHub) put the
busiest work first, catch-alls last.

## Fix

- groups sort by active (non-finished) session count desc, then name;
  `(agent)` fallback buckets always sort after real projects;
- group header buttons expose `aria-expanded`.

## Evidence after fix

Live: real repos first ordered by activity, `(devin) 41` last; reload
keeps grouped mode; 84 tests green.

## Honest boundary

Per-group collapse state still resets on reload (P2 — kept in-memory by
design so a stale collapse never hides fresh activity).
