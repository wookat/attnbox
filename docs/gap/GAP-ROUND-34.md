# GAP-ROUND-34 — CLS 根因定位与修复（0.37 → 0.076）+ 竞品/dogfood 巡检

Round 34. Driver dimensions: real testing (Lighthouse tracing), dogfood data
analysis, competitor recon.

## Competitor recon

- **ccmux** `7da2df3` (2026-08-06): one commit since round-31 — handoff
  follow-ups incl. a "stale waiting" fix. Still tmux-orchestration scope;
  nothing new to borrow.
- **Omnigent**: v0.8.0/v0.8.1 released 2026-08-03; we already reviewed 0.8.x
  behavior in rounds 30–31. No release since.

## Dogfood data analysis (live daemon, 106 real sessions)

- 100/106 authoritative, 0 items without `lastActivityAt`, 0 stale >7d,
  0 waiting items older than 24h — attention hygiene is healthy.
- Item order and content are stable across consecutive 3s collect cycles
  (verified by diffing two `/api/items` snapshots 6s apart) — this ruled out
  data churn as the CLS source.

## P1 — CLS root cause found and fixed

Round-33 left CLS at 0.37 with a wrong hypothesis (detail previews arriving
late). Tracing showed the real cause: the "everything else" `<section>` was
mounted from the very first render, so when the snapshot arrived and the
"Needs you" section (~1300px of waiting cards) was inserted *above* it, that
persistent element was pushed down — one 0.37 shift attributed to its `<ul>`.

Fix: while `!loaded` the whole list area renders only the skeleton section;
both real sections mount fresh after the first snapshot, so no persisted
element moves. Also reserve the detail line ("…") on waiting cloud cards whose
preview hasn't streamed in yet, so cards don't grow on later collect cycles.

Measured (Lighthouse 13.4.1, mobile emulation, live data, deterministic across
2 runs each):

| Metric | Round-33 | Round-34 |
| --- | --- | --- |
| CLS | 0.37 | **0.076** (good, < 0.1) |
| Performance | 79 | **95** |

Remaining 0.076 is the footer settling; below further-effort threshold.
