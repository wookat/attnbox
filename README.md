# attnbox

**Unified attention inbox for your AI coding agents.** Whether an agent runs in your terminal (Claude Code, Codex CLI) or in the cloud (Devin, and more coming), attnbox shows one inbox of *who is waiting on you and what for* — approve, answer, review — on desktop and phone.

Website & docs: **https://attnbox.zalize.com**

- **Zero-intrusion**: local agents are discovered by *reading* their existing session logs (`~/.claude`, `~/.codex`). No wrappers, no hooks required, no tmux required.
- **Cloud-aware**: cloud agents are polled via their public APIs (Devin today, plus a GitHub review-requested fallback; native Cursor Cloud Agents and GitHub Copilot coding agent support planned — see [docs/LIMITS.md](docs/LIMITS.md)).
- **Privacy-first**: everything stays on your machine. The daemon binds to `127.0.0.1`; cloud API keys are read from your environment and only ever sent to their own vendor.
- **Mobile-first web UI**: a responsive inbox (Tailwind), streamed live over SSE, installable as a PWA with optional browser notifications when an agent starts waiting on you.
- **Bring-your-own channel**: set `ATTNBOX_WEBHOOK_URL` and the daemon POSTs `{ event: "waiting", item }` to your endpoint (ntfy, a Slack relay, automation) each time an agent newly starts waiting — works with the inbox closed, no push server involved.

## Quick start

```bash
npx attnbox        # start the daemon + web inbox at http://127.0.0.1:4820
npx attnbox ls     # one-shot list in your terminal
```

Enable cloud collectors by exporting keys, e.g. `DEVIN_API_KEY=... npx attnbox`. Set `GITHUB_TOKEN` (or `ATTNBOX_GITHUB_TOKEN`) to include open PRs where your review is requested.

`npx attnbox doctor` shows which collectors are active and how to upgrade each one to authoritative status.

Optional: `npx attnbox hooks --install` idempotently merges the authoritative-mode hooks into your existing configs (originals backed up as `*.attnbox-bak`); `npx attnbox hooks` prints config snippets that upgrade Claude Code (via `~/.claude/settings.json` hooks) and Codex CLI (via `~/.codex/hooks.json` lifecycle hooks — including authoritative waiting-for-approval — with the `notify` line in `~/.codex/config.toml` as fallback) from heuristic to authoritative status.

## Status model

Every session becomes an `AttentionItem`: `waiting` (needs you — `approve` / `answer` / `review` / `unblock`), `working`, `idle`, or `done`, each tagged with its signal confidence (`authoritative` vs `heuristic`). See [docs/LIMITS.md](docs/LIMITS.md) for honest per-source capability boundaries.

## Development

pnpm workspace: `packages/core` (model), `packages/collectors` (one adapter per source), `packages/daemon` (localhost HTTP + SSE), `packages/cli` (`attnbox` bin), `apps/web` (React + Tailwind inbox).

```bash
pnpm install
pnpm build          # builds all packages + web UI
pnpm test           # vitest with coverage gates
pnpm lint && pnpm typecheck
```

## License

MIT
