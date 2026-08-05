# GAP-ROUND-6 — production benchmark loop, round 6

Date: 2026-08-05. Reference: **read-state sync** in GitHub notifications and Superhuman/Linear — mark something done on the desktop and the phone agrees. Round-2 introduced handled/ack triage but stored it in `localStorage`, so every browser had its own read state; for a product whose pitch includes checking the inbox from a phone (PWA), that was a real gap the round-2 report already flagged.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | GitHub notifications: done state is account-level, consistent across web/phone | ack state per-browser; phone and desktop disagree about what's handled | **P0** |
| 2 | Superhuman: read state syncs offline-first | Out of scope — attnbox has one daemon as the natural source of truth | — |

## Round-6 fix

Ack state moves into the daemon:

- persisted in `~/.attnbox/acked.json` (survives restarts, corrupt file degrades to empty)
- `POST /api/ack {id, at: string | null}` sets/clears; every payload (`/api/items` + SSE) now carries `acked`, so every connected tab/device updates live the moment one of them triages
- web: optimistic local toggle + POST; the SSE echo reconciles all other clients; pre-existing `localStorage` state kept as a migration fallback

## Evidence

- Real-machine smoke: acked a live waiting item over the API → `~/.attnbox/acked.json` written, `/api/items` payload carries it, SSE broadcast observed by the open tab.
- 62 tests (2 new: disk persistence across daemon restarts + set/clear roundtrip; malformed input rejection).

## Regression verdict

Triage now behaves like GitHub notifications across devices. Remaining carried gaps: macOS/Windows verification; Cursor/Copilot native collectors still blocked on credentials (fallback documented).
