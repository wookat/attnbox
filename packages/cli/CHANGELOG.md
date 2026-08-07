# attnbox

## 0.4.4

### Patch Changes

- 235e5da: Web inbox: SSE snapshots are no longer re-processed when byte-identical, and the offline-snapshot localStorage write happens on idle instead of synchronously on every message — at thousands of sessions the ~1 MB write was blocking the main thread (mobile Lighthouse perf 68 → 84).
- 1037c07: Web inbox: browser notifications no longer re-fire for every waiting item after a collector blip — an item only leaves the notified set when observed non-waiting (same guard the daemon webhook got in 0.3.1), and pre-existing waiting items never notify on startup.

## 0.4.3

### Patch Changes

- Updated dependencies [6fd4244]
  - attnbox-collectors@0.2.6
  - attnbox-daemon@0.3.2

## 0.4.2

### Patch Changes

- 9da6ffa: `attnbox ls` now prints the action URL under each waiting item (with the pull request as a secondary link when it differs) — terminal users get the same "click to go answer" affordance as the web inbox.
- e001ce7: `attnbox doctor` now reports the waiting-webhook channel: off when `ATTNBOX_WEBHOOK_URL` is unset, the target origin+path when configured, and a warning when the value is not a valid URL (which would make every post silently fail).

## 0.4.1

### Patch Changes

- Updated dependencies [6229c9d]
  - attnbox-daemon@0.3.1

## 0.4.0

### Minor Changes

- cfea37d: New waiting webhook: set `ATTNBOX_WEBHOOK_URL` and the daemon POSTs `{ event: "waiting", item }` each time an agent newly starts waiting on you — the extension point for Slack/ntfy/自动化 without a push server. Fire-and-forget: webhook failures never affect the inbox, and items already waiting at startup don't fire.

### Patch Changes

- 5f8ee87: New `p` shortcut opens the selected item's pull request, giving keyboard users the same secondary PR action the "PR ↗" chip gives pointer users.
- Updated dependencies [cfea37d]
  - attnbox-daemon@0.3.0

## 0.3.9

### Patch Changes

- 0a0e925: Waiting Devin cards get a secondary "PR ↗" link: the primary link still goes to the session (where you can answer), but the pull request is one click away again.
- 714f356: Fix three accessibility regressions caught by Lighthouse after round 63: the "PR ↗" chip's accessible name now contains its visible text, its touch target meets the 24px minimum, and the waiting-count badge passes AA contrast in light theme.
- Updated dependencies [0a0e925]
- Updated dependencies [ad33751]
  - attnbox-core@0.2.1
  - attnbox-collectors@0.2.5
  - attnbox-daemon@0.2.5

## 0.3.8

### Patch Changes

- 6f285d9: Grouped view: collapsed groups now persist across reloads (localStorage), which matters at real scale (65 project groups).
- 1efcd1f: Grouped view: group headers meet the WCAG 2.2 minimum tap target size (16px → 28px tall), which matters on phones with many project groups.
- Updated dependencies [b23580e]
  - attnbox-collectors@0.2.4
  - attnbox-daemon@0.2.4

## 0.3.7

### Patch Changes

- Updated dependencies [6c10158]
  - attnbox-collectors@0.2.3
  - attnbox-daemon@0.2.3

## 0.3.6

### Patch Changes

- 0b9af32: Light theme: done-status label and agent badge text darkened one shade to clear WCAG AA contrast on card backgrounds (dark theme unchanged).
- 435f234: Mobile: reply-box placeholder no longer overflows the textarea (shortcut hint moved to a tooltip); grouped-view fallback buckets render as "agent · no project" instead of "(agent)".
- fc330ce: Grouped view: j/k keyboard navigation now follows the on-screen group order and skips collapsed groups, instead of walking the flat list order.

## 0.3.5

### Patch Changes

- ac5756b: Grouped inbox view now sorts projects by active-session count (agent fallback buckets last) and group expanders expose aria-expanded.
- 6323970: Inbox search now also matches what the agent is asking (the waiting-item preview), not just title/project/agent.
- Updated dependencies [8f4f118]
- Updated dependencies [4b973c4]
  - attnbox-collectors@0.2.2
  - attnbox-daemon@0.2.2

## 0.3.4

### Patch Changes

- 2b47a5f: `attnbox ls` hides finished sessions (done/idle) by default with a "… N finished sessions hidden — `attnbox ls --all` to show" note; `--all` restores the full listing, `--json` always emits everything.
- be8b506: The web inbox now follows your system theme: full light theme (WCAG AA verified) alongside the existing dark theme, switching automatically with prefers-color-scheme.
- 37da279: Press `?` in the web inbox to see all keyboard shortcuts in an accessible help overlay — the keyboard triage flow (j/k, e, r, Enter) is now discoverable.
- 7de8be5: The web inbox header now has a theme toggle (system / light / dark) — the default still follows your OS, and a manual choice persists in the browser with no flash on reload.
- 2a9cc32: Reopening the inbox (e.g. the installed PWA) without a reachable daemon now shows the last known state under the reconnecting banner, instead of an endless loading skeleton.

## 0.3.3

### Patch Changes

- 0e8c010: Default inbox view collapses finished sessions behind a "Show N finished sessions" expander (76% of a real dogfood dataset was finished history drowning the actionable cards). Done tab, search, and grouped view are unchanged.
- ec65acd: The finished-sessions expander now covers the same statuses as the Done tab (cloud done + ended local idle sessions); unknown-status sessions stay visible.

## 0.3.2

### Patch Changes

- cad56a6: First-load polish and transport fixes: the inbox shows a loading skeleton instead of a false "No one is waiting on you" flash before the first snapshot arrives; hashed static assets are served with immutable cache headers (index.html/sw.js revalidate); added meta description and robots.txt.
- d3bc96b: Eliminated the large first-load layout shift (CLS 0.37 → 0.076, Lighthouse perf 79 → 95): the list area now mounts fresh after the first snapshot instead of pushing a pre-mounted section down, and waiting cloud cards reserve their detail-preview line while it streams in.
- Updated dependencies [cad56a6]
  - attnbox-daemon@0.2.1

## 0.3.1

### Patch Changes

- eb2c7c1: Mobile inbox ergonomics: the search box and filter tabs now stay pinned below the header while scrolling long session lists, and titles wrap to two lines on phones instead of truncating to one.

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
