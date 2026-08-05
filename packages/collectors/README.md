# attnbox-collectors

Collectors for [attnbox](https://www.npmjs.com/package/attnbox), the unified attention inbox for AI coding agents.

Read-only adapters that turn each agent's own state into `AttentionItem`s:

- **Claude Code** — session files + optional hooks (authoritative waiting).
- **Codex CLI** — rollout files + optional notify/hooks (authoritative waiting/approve).
- **Gemini CLI** — file activity only (heuristic working/idle; never claims waiting).
- **Devin** — public API; `blocked` sessions are authoritatively waiting, with a preview of what's being asked, and can be replied to (`sendDevinMessage`).
- **GitHub review-requested** — open PRs awaiting your review (fallback covering Copilot/Cursor agents and human teammates at the PR boundary).

Local collectors never write to agent directories or execute session files. Per-source guarantees and limits: https://attnbox.zalize.com/limits/

Most users want the CLI instead: `npx attnbox`.
