# Maturity self-assessment

Modeled on agentgate's docs/MATURITY.md. Updated per milestone.

| Dimension | Status (M0) | Evidence |
|---|---|---|
| Tests | ✅ unit tests across core/collectors/daemon/cli | `pnpm test` |
| Coverage gate | ✅ v8 coverage thresholds (lines/functions/statements 80, branches 70) enforced in CI | `vitest.config.ts` |
| CI | ✅ lint + typecheck + test + build on every PR | `.github/workflows/ci.yml` |
| Type safety | ✅ strict TS, `exactOptionalPropertyTypes`, no `any` (ESLint error) | `tsconfig.base.json`, `eslint.config.js` |
| Release management | ✅ Changesets configured; npm publish pending CEO dry-run approval | `.changeset/` |
| Security posture | ✅ SECURITY.md; localhost-only daemon; read-only collectors | `SECURITY.md` |
| Honest capability docs | ✅ per-source confidence documented | `docs/LIMITS.md` |
| Mobile-first UI | 🟡 responsive layout shipped in M0; visual polish + shadcn/ui in M1 | `apps/web` |
| Real-world validation | 🟡 verified against real `~/.claude`/`~/.codex` files and live Devin API on the dev machine; broader matrix in M1 | docs/FEASIBILITY.md |
