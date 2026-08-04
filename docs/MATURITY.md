# Maturity self-assessment

Modeled on agentgate's docs/MATURITY.md. Updated per milestone.

| Dimension | Status (M2) | Evidence |
|---|---|---|
| Tests | ✅ unit tests across core/collectors/daemon/cli | `pnpm test` |
| Coverage gate | ✅ v8 coverage thresholds (lines/functions/statements 80, branches 70) enforced in CI | `vitest.config.ts` |
| CI | ✅ lint + typecheck + test + build on every PR | `.github/workflows/ci.yml` |
| Type safety | ✅ strict TS, `exactOptionalPropertyTypes`, no `any` (ESLint error) | `tsconfig.base.json`, `eslint.config.js` |
| Release management | ✅ Changesets + first-release changeset; `pnpm -r publish --dry-run` verified for all 4 packages (web UI bundled into `attnbox` as `web-dist/`); publish execution pending CEO | `.changeset/`, `packages/cli/scripts/copy-web.mjs` |
| Security posture | ✅ SECURITY.md; localhost-only daemon; read-only collectors | `SECURITY.md` |
| Honest capability docs | ✅ per-source confidence documented | `docs/LIMITS.md` |
| Mobile-first UI | ✅ mobile-first responsive inbox with filters, safe-area support, PWA install + browser notifications | `apps/web` |
| Real-world validation | ✅ verified against real `~/.claude`/`~/.codex`/`~/.gemini` files and live Devin API; clean-environment quick-start rerun at M2 | docs/FEASIBILITY.md |
