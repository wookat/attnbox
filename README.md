# attnbox

**Unified attention inbox for your AI coding agents.** Whether an agent runs in your terminal (Claude Code, Codex CLI) or in the cloud (Devin, and more coming), attnbox shows one inbox of *who is waiting on you and what for* — approve, answer, review — on desktop and phone.

- **Zero-intrusion**: local agents are discovered by *reading* their existing session logs (`~/.claude`, `~/.codex`). No wrappers, no hooks required, no tmux required.
- **Cloud-aware**: cloud agents are polled via their public APIs (Devin today; Cursor Cloud Agents and GitHub Copilot coding agent planned — see [docs/LIMITS.md](docs/LIMITS.md)).
- **Privacy-first**: everything stays on your machine. The daemon binds to `127.0.0.1`; cloud API keys are read from your environment and only ever sent to their own vendor.
- **Mobile-first web UI**: a responsive inbox (Tailwind), streamed live over SSE.

## Quick start

```bash
npx attnbox        # start the daemon + web inbox at http://127.0.0.1:4820
npx attnbox ls     # one-shot list in your terminal
```

Enable cloud collectors by exporting keys, e.g. `DEVIN_API_KEY=... npx attnbox`.

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
