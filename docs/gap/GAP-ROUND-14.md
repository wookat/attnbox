# GAP-ROUND-14 — production benchmark loop, round 14

Date: 2026-08-05. Reference: **Linear / GitHub notifications inbox previews** — a good inbox shows *what* is being asked, not just *who* is asking. attnbox waiting items showed only the session title, forcing a context switch to app.devin.ai just to learn what the agent needs — the exact tool-switching cost the product exists to remove.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | Inbox rows preview the message content | Devin waiting items: title only; must open the console to see the question | **P0** |
| 2 | Previews load without hammering the API | n/a | design constraint |

## Round-14 fix

- `AttentionItem.detail?: string` — short preview of what the agent is asking, set only for waiting items.
- `DevinCollector`: for blocked sessions, fetches `GET /session/{id}` and extracts the last `devin_message` (whitespace-collapsed, 280-char cap). **Cached by `updated_at`** so each blocked session costs one extra request per state change, not per 3-second poll; cache entries evicted when sessions stop waiting; detail failures degrade silently (item stays waiting, no preview).
- Web inbox: preview under the title (`line-clamp-2`, full text on hover).
- `attnbox ls`: indented `└` detail line (100-char cap).

Read-only, same key/endpoint boundary as before (api.devin.ai only); no new write operations.

## Evidence

Real workspace, 8 blocked sessions: `ls --waiting` and the web inbox both show the actual question/report snippet per waiting session (screenshots captured). 76 tests green (new: detail attach + updated_at caching + silent degradation; CLI truncation).

## Regression verdict

Waiting items now answer "等我干什么" at a glance for Devin. Local agents: Claude/Codex hook payloads carry no question text (hooks fire on state, not content) — honest limit; a future round could preview the last transcript line heuristically. Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY).
