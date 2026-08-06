# GAP-ROUND-37 — 1000 会话规模复测 + 折叠语义对齐 Done 标签页（含 idle）

Round 37. Driver dimensions: real testing (scale), competitor recon, dogfood
data analysis.

## Competitor recon

- **ccmux** `380b6b2` (2026-08-06): 2 commits today — terminal-mode restore on
  exit and handoff follow-ups (incl. a "stale waiting" fix). Still
  tmux-orchestration scope.
- **Omnigent**: still 0.8.2 locally (`uv tool upgrade` → no new version;
  GitHub latest tag v0.8.1). Rounds 30–31 review stands; nothing new to test.

## Scale regression (real testing)

Re-ran the round-10 style 1,000-session synthetic Codex fixture against the
post-round-36 build:

- collector: 1,000 rollouts collected in **21 ms**;
- web UI with 1,000 cards: Lighthouse mobile **perf 92, CLS 0.047, LCP 2.0s,
  TBT 270 ms** — no regression from the expander work.

## P2→fix — collapse semantics didn't match the Done tab

Round-36 collapsed only `done` sessions. The Done tab has always treated
`idle` (ended local sessions) the same as `done`, and the scale fixture makes
the gap concrete: a heavy local user accumulates hundreds of ended local
sessions that would still render flat in "All". Aligned the expander with the
Done tab's statuses:

```tsx
const isFinished = (i) => i.status === "done" || i.status === "idle";
```

`unknown` deliberately stays visible — hiding sessions we can't classify would
be dishonest attention hygiene.

Verified live (real 106 sessions): default now 17 active cards +
"Show 89 finished sessions" (was 25 + 81 with done-only); expand/collapse and
j/k selection unchanged.
