# attnbox

## 0.1.0

### Minor Changes

- e860409: First public release: unified attention inbox for local (Claude Code, Codex, Gemini) and cloud (Devin, GitHub review-requested fallback) AI coding agents — localhost daemon, `attnbox` CLI, PWA web inbox with live SSE updates and browser notifications.
- b6dd80e: Codex hooks.json authoritative mode (`PermissionRequest` → waiting/approve, `Stop` → idle, `UserPromptSubmit` → working), web inbox search + keyboard navigation (`/`, j/k, Enter), and `attnbox ls --waiting` / `--json`.
- 6221886: Handled/ack triage model (✓ button + `e` key, auto-resurface on new activity), group-by-project toggle, and Devin `status_enum: null` fallback to the coarse `status` field.
- 10bec57: `attnbox doctor`: one-command setup diagnosis — which collectors are active, whether hooks make them authoritative, and whether the Devin key actually works (live API probe). Exits 1 when anything is degraded.
- de0d347: Act-in-place for cloud agents: reply to a blocked Devin session directly from the inbox (`↩` button or `r` key) via the new localhost `POST /api/reply` endpoint and `sendDevinMessage()`.
- de0d347: Handled/ack state now lives in the daemon (`~/.attnbox/acked.json`) and syncs live to every connected browser/device via `POST /api/ack` + SSE, instead of being trapped in one browser's localStorage.
- 3806064: `attnbox hooks --install`: one-command, idempotent setup of authoritative-mode hooks for Claude Code and Codex CLI — merges into existing configs with `*.attnbox-bak` backups, refuses unparseable configs instead of overwriting.

### Patch Changes

- 07e57b5: Readable CLI errors (unknown command, invalid/busy port) with exit code 1, and a visible warning when the Devin API rejects the configured key instead of silently dropping cloud sessions. CI now tests Node 20 and 22.
- c453819: Web inbox: actionable first-run empty state (concrete commands for local/cloud setup and diagnosis) and an explicit "daemon connection lost — reconnecting" banner instead of silently freezing the list.
- Updated dependencies [e860409]
- Updated dependencies [b6dd80e]
- Updated dependencies [6221886]
- Updated dependencies [07e57b5]
- Updated dependencies [de0d347]
- Updated dependencies [de0d347]
  - attnbox-core@0.1.0
  - attnbox-collectors@0.1.0
  - attnbox-daemon@0.1.0
