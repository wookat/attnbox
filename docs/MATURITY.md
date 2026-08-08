# Maturity self-assessment

Modeled on agentgate's docs/MATURITY.md. Updated per milestone.

| Dimension | Status (round 191 / v0.4.8 released) | Evidence |
|---|---|---|
| Tests | ✅ 98 unit tests across core/collectors/daemon/cli | `pnpm test` |
| Coverage gate | ✅ v8 coverage thresholds (lines/functions/statements 80, branches 70) enforced in CI | `vitest.config.ts` |
| CI | ✅ lint + typecheck + test + build on every PR, Node 20/22 matrix | `.github/workflows/ci.yml` |
| Type safety | ✅ strict TS, `exactOptionalPropertyTypes`, no `any` (ESLint error) | `tsconfig.base.json`, `eslint.config.js` |
| Release management | ✅ Changesets; 25+ npm releases through `attnbox@0.4.8` / `core@0.2.1` / `collectors@0.2.7` / `daemon@0.4.0`, each with clean-environment regression + GitHub Release | `.changeset/`, [Releases](https://github.com/wookat/attnbox/releases) |
| Security posture | ✅ SECURITY.md; localhost-only by default, `--host` gated by mandatory bearer token on every API/SSE surface (negative-tested rounds 29/84, re-proven rounds 163/182); read-only collectors; hook inputs validated; `/api/ack` input-hardened | `SECURITY.md`, `docs/gap/GAP-ROUND-84.md` |
| Governance | ✅ CONTRIBUTING.md + CODE_OF_CONDUCT.md (Contributor Covenant 2.1) + MIT LICENSE | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` |
| Public website | ✅ Astro Starlight site at attnbox.zalize.com — quickstart, inbox, hooks, doctor, limits pages + llms.txt; Lighthouse perf/a11y/bp/seo 100/100/100/100 | `apps/site`, `docs/gap/GAP-ROUND-95.md` |
| Honest capability docs | ✅ per-source confidence + operational boundaries kept current every round | `docs/LIMITS.md` |
| Mobile-first UI | ✅ responsive inbox, PWA install, offline last-known snapshot, actionable browser notifications, WCAG AA both themes (axe 0 violations across 10 interactive states, re-audited rounds 147/162/178), inbox Lighthouse a11y 100 | `apps/web`, `docs/gap/GAP-ROUND-147.md` |
| Performance at scale | ✅ live ~3,000 sessions: full Devin backlog crawl (cap 10,000), slim SSE (done sessions lazily loaded) — mobile Lighthouse perf 94 across all runs / TBT 0 ms at ~3,166 sessions (round-189), SSE gzip, daemon RSS flat (15-min soak @3,135, round-180) | `docs/gap/GAP-ROUND-189.md`, `docs/gap/GAP-ROUND-180.md` |
| Real-world validation | ✅ continuous dogfood against a live 3,000-session org: waiting/reply/ack/webhook paths end-to-end probed (controlled Devin probes rounds 93/137), hooks installer negative-tested (rounds 99/132/164/181), notification/webhook storm guards live-fire proven on real transitions (rounds 157/163/182/187 — 6 real transitions, exactly 6 notifications), all three local collectors live-fire verified (rounds 161/177/188), offline snapshot + SSE reconnect re-proven on the slim build (round-171) | `docs/gap/GAP-ROUND-157.md`, `docs/gap/GAP-ROUND-161.md` |
| Extension points | ✅ `ATTNBOX_WEBHOOK_URL` waiting webhook (ntfy/Slack relays, documented recipe) + token-gated HTTP API | `docs/gap/GAP-ROUND-69.md`, `docs/gap/GAP-ROUND-73.md` |
| Competitive posture | ✅ tri-weekly competitor scans on file; local+cloud unified inbox + zero-intrusion discovery remains uncontested | `docs/COMPARISON.md` |
