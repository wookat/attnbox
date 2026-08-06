# GAP-ROUND-59 — 1,000 规模 UI 复测 + 分组折叠持久化

Round 59. Driver dimension: real testing (post-round-58 scale) + UX walkthrough.

## Scale retest (1,006 real items, post-pagination)

Playwright against the live daemon:

- default view: 42 cards (finished collapse doing its job);
- expanding "Show N finished sessions" to 1,006 cards: ~300 ms, no jank;
- search over 1,006 items: instant per keystroke, 20 results for "suinian";
- grouped view: 65 project groups, toggle ~1 ms.

No new perf P0/P1 at 10× the previous dogfood scale.

## UX finding → fixed

At 65 groups, collapsing the ones you don't care about is core to the
grouped workflow — but collapse state reset on every reload (a P2 since
round-54, upgraded by the 14→65 group jump). Collapsed group names now
persist in `localStorage("attnbox:collapsed")`, restored on load with
type-checked parsing (corrupt values fall back to empty).

Keyboard order stays consistent: `ordered` already skips collapsed
groups (round-56), so a restored collapse state is reflected in `j/k`
from first render.

## Honest boundary

- Persistence is per-browser (same as theme/group toggles), not synced
  through the daemon like acks — deliberate: it's view preference, not
  triage state.
- Stale group names (projects that disappear) linger in the saved set;
  harmless (never matched) and bounded by real project count.
