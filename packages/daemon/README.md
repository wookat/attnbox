# attnbox-daemon

Local daemon for [attnbox](https://www.npmjs.com/package/attnbox), the unified attention inbox for AI coding agents.

Binds to `127.0.0.1` only and serves the web inbox plus a small API: `/api/items` (snapshot), `/api/events` (SSE, broadcast only on change), `/api/ack` (cross-device triage state, persisted in `~/.attnbox/acked.json`), `/api/reply` (act-in-place reply to blocked Devin sessions — the only write attnbox ever performs, enabled only with `DEVIN_API_KEY`).

Most users want the CLI instead: `npx attnbox`. Docs: https://attnbox.zalize.com
