# attnbox-collectors

## 0.2.2

### Patch Changes

- 8f4f118: Devin sessions with a pull request now carry the repo (owner/repo) as their project, so the grouped inbox view organizes cloud sessions by repository instead of one flat "devin" bucket.
- 4b973c4: Waiting Devin sessions now link to the session (where the question can be answered) instead of the PR; non-waiting sessions still link PR-first.

## 0.2.1

### Patch Changes

- 7a99812: Devin detail previews: cap uncached `GET /session/{id}` lookups at 10 per collect cycle; remaining blocked sessions catch up on later cycles. Bounds cold-start/burst API cost regardless of workspace size.

## 0.2.0

### Minor Changes

- 5d11c8c: Waiting items now show what the agent is actually asking: Devin blocked sessions carry a `detail` preview (last agent message, cached by `updated_at`) rendered in the web inbox and as an indented line in `attnbox ls`.

### Patch Changes

- 8a766b5: github-pr fallback: bad tokens (401/403) now warn on stderr instead of silently dropping review requests, and `attnbox doctor` live-probes the GitHub token like it does the Devin key.
- ddb1d4d: Local waiting items now say what for: Claude Code previews the last assistant message, Codex previews the pending approval (`wants to run: <command>` / `wants to apply a patch`) — same read-only files, no new I/O.
- Updated dependencies [5d11c8c]
  - attnbox-core@0.2.0

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
