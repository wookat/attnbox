# GAP-ROUND-9 — production benchmark loop, round 9

Date: 2026-08-05. Reference: **first-run and failure states** — Linear's empty inbox teaches the next action; Superhuman/GitHub show an explicit "reconnecting" state instead of silently going stale. A brand-new attnbox user who starts the daemon before any agent session saw only "Nothing here · Start a … session" with no concrete commands; and if the daemon died, the only cue was the tiny header chip flipping to "offline" while the list silently froze.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | Linear empty inbox: teaches the exact next action | generic one-liner, no commands, no pointer to doctor/hooks | **P0** |
| 2 | GitHub/Superhuman: explicit stale-data banner when live connection drops | header chip flips to "offline"; data silently freezes | **P0** |

## Round-9 fix

- First-run empty state (no sessions at all, `All` filter, no query): a card with the three concrete next actions — start a local agent session, `DEVIN_API_KEY=… npx attnbox` / `GITHUB_TOKEN=…` for cloud, `npx attnbox doctor` + `npx attnbox hooks --install` to diagnose/upgrade. Filter/search empty states keep their specific one-liners.
- Disconnect banner: once a connection has ever been established, losing it shows "Connection to the attnbox daemon lost — showing the last known state, reconnecting…" under the header (EventSource auto-reconnects; banner clears on reconnect). No banner on first load, where "offline" is expected until the first SSE open.

## Evidence

- Screenshots (desktop 1280×900, mobile 390×844) of the first-run card against a real daemon started with an empty `$HOME` and no cloud keys; disconnect banner captured by killing that daemon under an open tab.
- 67 tests unchanged (rendering-only change); lint/build/typecheck green.

## Regression verdict

First contact now teaches the product instead of presenting an empty box, and stale data is impossible to mistake for live data. Remaining carried gaps: macOS/Windows verification; Cursor/Copilot credentials.
