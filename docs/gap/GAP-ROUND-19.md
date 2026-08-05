# GAP-ROUND-19 — production benchmark loop, round 19

Date: 2026-08-05. Reference: **mobile push UX (Slack/Linear)** — a good notification is decidable from the lock screen: you read it and know whether to act now. attnbox notifications said `devin: has a question` + session title; with rounds 14/16 the inbox knows *what* is being asked, but the notification still didn't say.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | Notification body carries the actual ask | body = title only | P1 |

Also verified this round (no change needed): SSE rebroadcast uses a full-snapshot compare (`JSON.stringify(next) !== JSON.stringify(snapshot)`), so a detail-only change already propagates live to open tabs.

## Round-19 fix

Notification body = `title\ndetail` when a preview exists (falls back to title). One-line change in the web notification path; OS notification centers truncate long bodies themselves.

## Measurement attempt (honest)

Tried to quantify local heuristic accuracy against hook ground truth (baseline #2 remainder): this machine has only 1 real Claude session and no hook-covered ones, so no meaningful numbers — requires a real multi-session local work period; stays a carried gap.

## Regression verdict

Waiting notifications are now decidable from the lock screen. Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY, heuristic misjudgment quantification).
