# Maturity self-assessment

Modeled on agentgate's docs/MATURITY.md. Updated per milestone.

| Dimension | Status (M3 / v0.0.1 released) | Evidence |
|---|---|---|
| Tests | ✅ unit tests across core/collectors/daemon/cli | `pnpm test` |
| Coverage gate | ✅ v8 coverage thresholds (lines/functions/statements 80, branches 70) enforced in CI | `vitest.config.ts` |
| CI | ✅ lint + typecheck + test + build on every PR | `.github/workflows/ci.yml` |
| Type safety | ✅ strict TS, `exactOptionalPropertyTypes`, no `any` (ESLint error) | `tsconfig.base.json`, `eslint.config.js` |
| Release management | ✅ Changesets; v0.0.1 published to npm (`attnbox`, `attnbox-core`, `attnbox-collectors`, `attnbox-daemon`) + git tag + GitHub Release | `.changeset/`, [Release v0.0.1](https://github.com/wookat/attnbox/releases/tag/v0.0.1) |
| Security posture | ✅ SECURITY.md; localhost-only daemon; read-only collectors; hook inputs validated (session/thread id whitelist) | `SECURITY.md` |
| Governance | ✅ CONTRIBUTING.md + CODE_OF_CONDUCT.md (Contributor Covenant 2.1) + MIT LICENSE | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` |
| Public website | ✅ docs site (Astro Starlight) deployed at attnbox.zalize.com with quick start + honest limits | `apps/site`, https://attnbox.zalize.com |
| Honest capability docs | ✅ per-source confidence documented | `docs/LIMITS.md` |
| Mobile-first UI | ✅ mobile-first responsive inbox with filters, safe-area support, PWA install + browser notifications | `apps/web` |
| Real-world validation | ✅ verified against real `~/.claude`/`~/.codex`/`~/.gemini` files and live Devin API; clean-environment quick-start rerun at M2; `npx attnbox` verified post-publish | docs/FEASIBILITY.md |
