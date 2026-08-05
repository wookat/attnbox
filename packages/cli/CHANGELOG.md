# attnbox

## 0.3.0

### Minor Changes

- 6145c5a: `attnbox --host <addr>` (env `ATTNBOX_HOST`) opens the inbox to other devices — e.g. install the PWA on your phone. Non-loopback binds refuse to start without `ATTNBOX_TOKEN`; every `/api/*` request then requires the token (Bearer header or `?token=`), which the web UI picks up once from `/?token=<token>` and persists. The daemon gains a `token` option enforcing this.

### Patch Changes

- Updated dependencies [aed5e77]
- Updated dependencies [6145c5a]
  - attnbox-daemon@0.2.0

## 0.2.1

### Patch Changes

- 0079535: Web inbox passes axe-core (WCAG AA) clean: all secondary text lifted from zinc-500/600 to zinc-400, fixing ~220 color-contrast violations (ratios 2.5–4.1 → ≥ 8:1).
- 5156fc8: Browser notifications now include the waiting item's question/approval preview in the body, so they're decidable from the lock screen.
- b6d2d6a: Browser notifications gain a ✓ Done action button (service-worker notifications): ack a waiting item straight from the notification without opening the inbox. Plain clicks still open the item; browsers without SW notification actions fall back to the previous behavior.
- 940e116: The Needs-you section gains a "✓ all done" button to ack every visible waiting item at once (respects the active search/filter; same persistence and resurface semantics as single acks).
- Updated dependencies [7a99812]
  - attnbox-collectors@0.2.1
  - attnbox-daemon@0.1.2

## 0.2.0

### Minor Changes

- 5d11c8c: Waiting items now show what the agent is actually asking: Devin blocked sessions carry a `detail` preview (last agent message, cached by `updated_at`) rendered in the web inbox and as an indented line in `attnbox ls`.

### Patch Changes

- 8a766b5: github-pr fallback: bad tokens (401/403) now warn on stderr instead of silently dropping review requests, and `attnbox doctor` live-probes the GitHub token like it does the Devin key.
- ddb1d4d: Local waiting items now say what for: Claude Code previews the last assistant message, Codex previews the pending approval (`wants to run: <command>` / `wants to apply a patch`) — same read-only files, no new I/O.
- Updated dependencies [8a766b5]
- Updated dependencies [5d11c8c]
- Updated dependencies [ddb1d4d]
  - attnbox-collectors@0.2.0
  - attnbox-core@0.2.0
  - attnbox-daemon@0.1.1

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
