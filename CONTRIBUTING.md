# Contributing to attnbox

Thanks for your interest! attnbox is a pnpm workspace monorepo (Node 22, strict TypeScript).

## Setup

```bash
git clone https://github.com/wookat/attnbox.git && cd attnbox
pnpm install
pnpm build          # builds all packages (web UI is bundled into the CLI)
```

## Development loop

```bash
pnpm lint           # ESLint (no `any`, type-only imports enforced)
pnpm typecheck      # tsc --noEmit across the workspace
pnpm test           # Vitest with coverage gates (80/80/80 lines/fns/stmts, 70 branches)
node packages/cli/dist/index.js   # run the CLI/daemon locally
```

## Pull requests

- All changes go through a PR with green CI; no direct pushes to `main`.
- Keep PRs focused and small. Add or update tests for behavior changes.
- Collector rules: local collectors must stay **read-only** with respect to agent
  directories (the only writable path is attnbox's own `~/.attnbox/`), must fail
  soft, and must tag their signals honestly (`authoritative` vs `heuristic` —
  see `docs/LIMITS.md`). Never make a source claim "waiting" without a reliable signal.
- User-visible capability changes must update `docs/LIMITS.md`.
- Add a changeset (`pnpm changeset`) when a published package changes behavior.

## Releasing

- `pnpm changeset version` in a PR, then publish each package with **`npm publish`**
  (per package, from its directory) — `pnpm -r publish` does not upload the README
  to the registry packument, leaving the npm package pages blank.

## Reporting bugs / proposing features

Open a GitHub issue with reproduction steps or a concrete use case. For security
issues, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
