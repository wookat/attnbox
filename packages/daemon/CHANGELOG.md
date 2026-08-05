# attnbox-daemon

## 0.1.1

### Patch Changes

- Updated dependencies [8a766b5]
- Updated dependencies [5d11c8c]
- Updated dependencies [ddb1d4d]
  - attnbox-collectors@0.2.0
  - attnbox-core@0.2.0

## 0.1.0

### Minor Changes

- e860409: First public release: unified attention inbox for local (Claude Code, Codex, Gemini) and cloud (Devin, GitHub review-requested fallback) AI coding agents — localhost daemon, `attnbox` CLI, PWA web inbox with live SSE updates and browser notifications.
- de0d347: Act-in-place for cloud agents: reply to a blocked Devin session directly from the inbox (`↩` button or `r` key) via the new localhost `POST /api/reply` endpoint and `sendDevinMessage()`.
- de0d347: Handled/ack state now lives in the daemon (`~/.attnbox/acked.json`) and syncs live to every connected browser/device via `POST /api/ack` + SSE, instead of being trapped in one browser's localStorage.

### Patch Changes

- Updated dependencies [e860409]
- Updated dependencies [b6dd80e]
- Updated dependencies [6221886]
- Updated dependencies [07e57b5]
- Updated dependencies [de0d347]
  - attnbox-core@0.1.0
  - attnbox-collectors@0.1.0
