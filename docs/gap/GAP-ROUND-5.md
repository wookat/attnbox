# GAP-ROUND-5 — production benchmark loop, round 5

Date: 2026-08-05. Reference: **act-in-place** — the single biggest UX advantage of ccmux/agent-dashboard-style tools (`ccmux send`, agent-dashboard's mobile approve buttons) and of GitHub's notifications inbox (reply/approve without leaving). AttnBox has deliberately been link-out only; for **cloud** agents that trade-off is unnecessary — the Devin API supports messaging a session directly.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | agent-dashboard: approve/reply to an agent from the phone, in place | Devin `waiting` items link out to app.devin.ai; on mobile that's a heavy context switch | **P0** |
| 2 | ccmux `send`: type into a local agent's pane | Out of scope by design (no tmux/wrapper dependency) — unchanged, documented in LIMITS | — |

## Round-5 fix

Reply to a blocked Devin session without leaving the inbox:

- `sendDevinMessage()` in attnbox-collectors (session-id validated, empty messages refused, HTTP/network failures reported, key sent only to api.devin.ai over HTTPS).
- Daemon `POST /api/reply` (localhost-only like everything else; 501 when no key configured, 400 on bad input, 64 KB body cap, handler result surfaced verbatim).
- Web: `↩` button / `r` key on Devin waiting cards opens an inline reply box (⌘↵ send, Esc cancel); success marks the item handled.

## Evidence

- Live path verified end-to-end against the real Devin API: replying to a nonexistent session surfaces `{"ok":false,"status":404,"error":"HTTP 404"}` through daemon → collector → UI; malformed JSON → 400; real inbox (103 sessions) unaffected.
- Not verified: an actual delivered message to a production blocked session — all currently blocked sessions belong to live work streams and injecting test messages would disturb them. The request shape matches the documented `POST /v1/session/{session_id}/message` contract.
- 60 tests pass (6 new: endpoint forwarding/validation/501, send success/refusal/failure).

## Regression verdict

Cloud act-in-place closes the round-1 "still worse than" item for Devin. Local act-in-place remains intentionally out of scope. Remaining: ack state still per-browser; macOS/Windows verification.
