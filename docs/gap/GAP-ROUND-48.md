# GAP-ROUND-48 — 搜索覆盖"agent 在问什么"（detail）

Round 48. Driver dimensions: competitor recon, UX walkthrough.

## Evidence sweep

- Competitor recon: ccmux +1 commit since round-42 (`b2bc7d4` split the
  relay skill out of dispatch — orchestration, not attention surface);
  Omnigent still 0.8.2 (`uv tool upgrade` → "Nothing to upgrade").
- UX walkthrough of search: rounds 14/16 made "what is it asking" the
  centerpiece of every waiting card, but `/` search only matched title /
  project / agent. Live repro: searching a word from a real waiting item's
  question returned **0 results** while the question was on screen.

## Gap (P1)

Search that ignores the most information-dense text on the card breaks the
"find that thing an agent asked me" recall flow — the exact flow search
exists for. Gmail/Linear search body text, not just subjects.

## Fix

`matchesQuery` now also matches `item.detail`; the search placeholder says
so.

## Evidence after fix

Live: searching a mid-question word from a real waiting Devin item returns
exactly that item (was 0 results). 84 tests green.

## Honest boundary

Only current detail text is searchable — no history, no full transcripts
(collectors only surface the latest question by design).
