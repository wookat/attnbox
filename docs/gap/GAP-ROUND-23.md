# GAP-ROUND-23 — production benchmark loop, round 23

Date: 2026-08-05. Reference: ccmux's actionable desktop notifications (Approve/Deny/Reply buttons on the notification itself — round-22's P2) and mobile OS notification actions generally: the best inbox tools let you clear an item without opening the app.

## Gap

Our browser notifications (round-19) show who's waiting and what for, but the only affordance is click-to-open. Acking still requires switching to the inbox tab — exactly the context switch attnbox exists to remove.

## Fix

Notifications are now dispatched through the service worker (`registration.showNotification`) with a **✓ Done** action button. The SW `notificationclick` handler:

- `action === "ack"` → `POST /api/ack` directly from the worker (persisted daemon-side, synced to all devices via SSE) — no tab focus needed
- plain click → opens the item's URL, or focuses/opens the inbox

Environments without an active SW registration (e.g. dev mode) fall back to the previous page-level `new Notification` path unchanged.

## Evidence

Live E2E on the real daemon (104 sessions): granted notification permission, real waiting items raised SW notifications with the ✓ Done button; clicking it dispatched `{action: "ack"}` with the item's id, `POST /api/ack` returned 200, and the entry landed in `~/.attnbox/acked.json`. The item later resurfaced when the underlying Devin session had new activity — the round-2 resurface semantics applying correctly to notification-driven acks too.

Note: notification action buttons are a SW-notification feature (Chrome/Edge/Android). Browsers without action support simply render the notification without the button; behavior degrades to click-to-open.

## Quality gates

lint / build / typecheck green; 79 tests green.

## Carried gaps

Gemini key, Cursor credentials (now also: `cursor-agent` installed locally but needs login/`CURSOR_API_KEY` — requested), Copilot access, macOS, heuristic FP/FN quantification, npm README (next release: `pnpm pack` + `npm publish` tarball).
