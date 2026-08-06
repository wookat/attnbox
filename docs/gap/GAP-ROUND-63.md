# GAP-ROUND-63 — waiting 卡片找回 PR 链接（round-50 遗留 P2 转正）

Round 63. Driver dimension: UX walkthrough (round-50 follow-up on real
waiting items).

## Evidence

round-50 made waiting Devin sessions link to the session (the only
place you can answer) — correct, but it silently dropped the PR link.
Live walkthrough: 5 of the 6 current waiting items have an open PR the
question refers to ("see PR #65…"), and reviewing that PR is usually
step 1 of answering. Getting to it required opening the session and
hunting through the timeline. Upgraded from P2 to fix-now: it's on the
critical answer path.

## Fix

- `AttentionItem` gains optional `prUrl`, set by the Devin collector
  only when the PR is not already the primary `url` (i.e. waiting
  sessions with a PR).
- Waiting cards render a small "PR ↗" chip in the metadata row. It must
  be a `<button>` (the whole card is already an `<a>`; nested anchors
  are invalid HTML) that `window.open`s the PR.

Verified live: 5 chips on the current waiting set, click opens the PR
in a new tab without triggering the card link.

## Honest boundary

`attnbox ls` doesn't show the PR URL (keeping one line per session);
`--json` consumers get `prUrl` for free.
