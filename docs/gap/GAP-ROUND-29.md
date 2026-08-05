# GAP-ROUND-29 — production benchmark loop, round 29

Date: 2026-08-05. Reference: agent-dashboard (re-checked at HEAD `b3c04cf`, no movement since 2026-07-08) — its headline is "phone-first remote control": the companion PWA is served **over the local network** so a phone can actually reach it, with optional single-user Google OAuth.

## Gap

We call mobile a first-class experience, and the web inbox is a responsive installable PWA — but the daemon bound `127.0.0.1` only. A phone on the same network **could not open the inbox at all** without the user hand-rolling an SSH tunnel. agent-dashboard ships LAN serving out of the box; we shipped a mobile UI no mobile device could reach. P1.

## Fix

- `attnbox --host <addr>` / `ATTNBOX_HOST` (default unchanged: `127.0.0.1`).
- Security gate, not vibes: a non-loopback bind **refuses to start** without `ATTNBOX_TOKEN` (the API exposes agent activity and the Devin reply write-path). With a token, every `/api/*` request requires it — `Authorization: Bearer` or `?token=`; wrong/missing → 401.
- Web UI: `/?token=<token>` once per device → persisted, URL stripped, then all fetches/SSE/SW-notification-acks carry it.
- LIMITS (repo + site) and a new site "From your phone" section state the honest boundary: the token protects the API, not the transport (plain HTTP) — prefer a tailnet/VPN.

## Evidence

Live on the real workspace: tokenless `--host 0.0.0.0` refused with actionable error; with token, LAN IP `172.16.7.2:4841` served the UI, `?token=` was stripped and persisted, SSE went live (104 sessions, 11 waiting), API without token → 401, with token → 200. Quality gates green; 80 tests (new daemon token-gating test).

## Honest limits

- Plain HTTP: token readable on-path if the network is hostile — documented, tailnet recommended.
- No multi-user/roles — single shared token, matching agent-dashboard's single-user scope.

## Carried gaps

Unchanged: Gemini key; Cursor login (requested); Copilot; macOS; heuristic FP/FN quantification.
