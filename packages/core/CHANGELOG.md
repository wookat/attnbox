# attnbox-core

## 0.2.0

### Minor Changes

- 5d11c8c: Waiting items now show what the agent is actually asking: Devin blocked sessions carry a `detail` preview (last agent message, cached by `updated_at`) rendered in the web inbox and as an indented line in `attnbox ls`.

## 0.1.0

### Minor Changes

- e860409: First public release: unified attention inbox for local (Claude Code, Codex, Gemini) and cloud (Devin, GitHub review-requested fallback) AI coding agents — localhost daemon, `attnbox` CLI, PWA web inbox with live SSE updates and browser notifications.
