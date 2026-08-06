# GAP-ROUND-54 — 性能/规模复测与数据健康度（无新 P0/P1）

Round 54. Driver dimensions: real testing (performance), dogfood data
analysis.

## Evidence（实机，v0.3.5 代码、106 会话）

- `/api/items`: 40,246 bytes, latency 0.8–1.0 ms (loopback).
- `attnbox ls --waiting` one-shot: 2.9 s wall — dominated by the Devin
  sessions list + parallel detail fetches (network-bound, already
  `Promise.all`-parallel with the round-20 burst cap; no code-side win
  available without lying about freshness).
- SSE `/api/events`: 6 messages in 60 s (1 initial + 5 real state
  changes) — broadcasts only on change, no 3s-cycle spam; good for
  mobile/PWA battery.
- Header "N agents are waiting on you" uses unacked waiting (correct);
  offline banner + last-known state verified again.
- `~/.attnbox/acked.json`: 1,149 bytes after ~2 weeks of dogfood.

## Classification

No new P0/P1. Honest P2 ledger (unchanged or newly noted):

1. `acked.json` never prunes entries for long-gone sessions — growth is
   ~bytes/day; a safe prune must not fire on collector fail-soft empties
   (would wipe live acks), so it needs age + absence criteria. Revisit if
   the file ever matters (≫100 KB).
2. ~93 KiB unused JS in the single-page bundle (round-49).
3. Grouped-view collapse state resets on reload (round-47, by design).
4. Waiting cards no longer expose the PR link (round-50 trade).

## Next-round triggers

New evidence, credentials (cursor/claude/codex), competitor movement, or
any of the P2s crossing a real-impact threshold.
