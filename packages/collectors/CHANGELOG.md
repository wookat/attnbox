# attnbox-collectors

## 0.1.0

### Minor Changes

- e860409: First public release: unified attention inbox for local (Claude Code, Codex, Gemini) and cloud (Devin, GitHub review-requested fallback) AI coding agents — localhost daemon, `attnbox` CLI, PWA web inbox with live SSE updates and browser notifications.
- b6dd80e: Codex hooks.json authoritative mode (`PermissionRequest` → waiting/approve, `Stop` → idle, `UserPromptSubmit` → working), web inbox search + keyboard navigation (`/`, j/k, Enter), and `attnbox ls --waiting` / `--json`.
- de0d347: Act-in-place for cloud agents: reply to a blocked Devin session directly from the inbox (`↩` button or `r` key) via the new localhost `POST /api/reply` endpoint and `sendDevinMessage()`.

### Patch Changes

- 6221886: Handled/ack triage model (✓ button + `e` key, auto-resurface on new activity), group-by-project toggle, and Devin `status_enum: null` fallback to the coarse `status` field.
- 07e57b5: Readable CLI errors (unknown command, invalid/busy port) with exit code 1, and a visible warning when the Devin API rejects the configured key instead of silently dropping cloud sessions. CI now tests Node 20 and 22.
- Updated dependencies [e860409]
  - attnbox-core@0.1.0
