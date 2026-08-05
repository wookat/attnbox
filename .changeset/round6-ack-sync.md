---
"attnbox-daemon": minor
"attnbox": minor
---

Handled/ack state now lives in the daemon (`~/.attnbox/acked.json`) and syncs live to every connected browser/device via `POST /api/ack` + SSE, instead of being trapped in one browser's localStorage.
