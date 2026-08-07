# Maturity self-assessment

Modeled on agentgate's docs/MATURITY.md. Updated per milestone.

| Dimension | Status (round 155 / v0.4.8 released) | Evidence |
|---|---|---|
| Tests | ✅ 98 unit tests across core/collectors/daemon/cli | `pnpm test` |
| Coverage gate | ✅ v8 coverage thresholds (lines/functions/statements 80, branches 70) enforced in CI | `vitest.config.ts` |
| CI | ✅ lint + typecheck + test + build on every PR, Node 20/22 matrix | `.github/workflows/ci.yml` |
| Type safety | ✅ strict TS, `exactOptionalPropertyTypes`, no `any` (ESLint error) | `tsconfig.base.json`, `eslint.config.js` |
| Release management | ✅ Changesets; 25+ npm releases through `attnbox@0.4.8` / `core@0.2.1` / `collectors@0.2.7` / `daemon@0.4.0`, each with clean-environment regression + GitHub Release | `.changeset/`, [Releases](https://github.com/wookat/attnbox/releases) |
| Security posture | ✅ SECURITY.md; localhost-only by default, `--host` gated by mandatory bearer token on every API/SSE surface (negative-tested rounds 29/84); read-only collectors; hook inputs validated; `/api/ack` input-hardened | `SECURITY.md`, `docs/gap/GAP-ROUND-84.md` |
| Governance | ✅ CONTRIBUTING.md + CODE_OF_CONDUCT.md (Contributor Covenant 2.1) + MIT LICENSE | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` |
| Public website | ✅ Astro Starlight site at attnbox.zalize.com — quickstart, inbox, hooks, doctor, limits pages + llms.txt; Lighthouse perf/a11y/bp/seo 100/100/100/100 | `apps/site`, `docs/gap/GAP-ROUND-95.md` |
| Honest capability docs | ✅ per-source confidence + operational boundaries kept current every round | `docs/LIMITS.md` |
| Mobile-first UI | ✅ responsive inbox, PWA install, offline last-known snapshot, actionable browser notifications, WCAG AA both themes (axe 0 violations across 10 interactive states, re-audited round-147), inbox Lighthouse a11y 100 | `apps/web`, `docs/gap/GAP-ROUND-147.md` |
| Performance at scale | ✅ live ~3,000 sessions: full Devin backlog crawl (cap 10,000), slim SSE (done sessions lazily loaded) — mobile Lighthouse perf median 94 / TBT ≤10 ms at ~3,070 sessions (round-152), SSE gzip, daemon RSS flat (10-min soak @3,024, round-146) | `docs/gap/GAP-ROUND-152.md`, `docs/gap/GAP-ROUND-146.md` |
| Real-world validation | ✅ continuous dogfood against a live 3,000-session org: waiting/reply/ack/webhook paths end-to-end probed (controlled Devin probes rounds 93/137), hooks installer negative-tested (rounds 99/132), notification/webhook storm guards regression-tested (rounds 121/141) | `docs/gap/GAP-ROUND-137.md`, `docs/gap/GAP-ROUND-141.md` |
| Extension points | ✅ `ATTNBOX_WEBHOOK_URL` waiting webhook (ntfy/Slack relays, documented recipe) + token-gated HTTP API | `docs/gap/GAP-ROUND-69.md`, `docs/gap/GAP-ROUND-73.md` |
| Competitive posture | ✅ tri-weekly competitor scans on file; local+cloud unified inbox + zero-intrusion discovery remains uncontested | `docs/COMPARISON.md` |
