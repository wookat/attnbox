# attnbox-daemon

## 0.3.1

### Patch Changes

- 6229c9d: The waiting webhook no longer re-fires every waiting item after a collector outage: an item leaves the "already notified" set only when observed in a non-waiting status, not when it is merely absent from a collection pass.

## 0.3.0

### Minor Changes

- cfea37d: New waiting webhook: set `ATTNBOX_WEBHOOK_URL` and the daemon POSTs `{ event: "waiting", item }` each time an agent newly starts waiting on you — the extension point for Slack/ntfy/自动化 without a push server. Fire-and-forget: webhook failures never affect the inbox, and items already waiting at startup don't fire.

## 0.2.5

### Patch Changes

- ad33751: SSE snapshots and /api/items are gzip-compressed for clients that accept it — measured wire cost at 1,000 sessions drops from ~757 KB/min to ~186 KB/min per open tab.
- Updated dependencies [0a0e925]
  - attnbox-core@0.2.1
  - attnbox-collectors@0.2.5

## 0.2.4

### Patch Changes

- Updated dependencies [b23580e]
  - attnbox-collectors@0.2.4

## 0.2.3

### Patch Changes

- Updated dependencies [6c10158]
  - attnbox-collectors@0.2.3

## 0.2.2

### Patch Changes

- Updated dependencies [8f4f118]
- Updated dependencies [4b973c4]
  - attnbox-collectors@0.2.2

## 0.2.1

### Patch Changes

- cad56a6: First-load polish and transport fixes: the inbox shows a loading skeleton instead of a false "No one is waiting on you" flash before the first snapshot arrives; hashed static assets are served with immutable cache headers (index.html/sw.js revalidate); added meta description and robots.txt.

## 0.2.0

### Minor Changes

- 6145c5a: `attnbox --host <addr>` (env `ATTNBOX_HOST`) opens the inbox to other devices — e.g. install the PWA on your phone. Non-loopback binds refuse to start without `ATTNBOX_TOKEN`; every `/api/*` request then requires the token (Bearer header or `?token=`), which the web UI picks up once from `/?token=<token>` and persists. The daemon gains a `token` option enforcing this.

### Patch Changes

- aed5e77: `POST /api/ack` now rejects oversized bodies (413, 64 KiB cap), non-timestamp `at` values (400), and ids not present in the current snapshot (404) — arbitrary local input can no longer grow `~/.attnbox/acked.json` without bound. Un-acking (`at: null`) still works for vanished ids so stale entries remain removable.

## 0.1.2

### Patch Changes

- Updated dependencies [7a99812]
  - attnbox-collectors@0.2.1

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
