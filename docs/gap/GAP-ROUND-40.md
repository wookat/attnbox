# GAP-ROUND-40 — 依赖安全审计：sharp high 级告警清零

Round 40. Driver dimensions: security/compliance audit.

## Audit

`pnpm audit` (prod and full): **1 high** — `sharp <0.35.0` inherits libvips
CVE-2026-33327/33328/35590/35591 (GHSA-f88m-g3jw-g9cj). Every path is inside
`apps/site` (Astro/Starlight image pipeline); the published npm packages
(`attnbox*`) have **zero** runtime dependencies on sharp, so end users were
never exposed — this is build-tooling exposure only.

## Fix

- `apps/site` direct dep `sharp` 0.34.4 → **0.35.3** (published 2026-07-01,
  well past the 7-day supply-chain window);
- root `pnpm.overrides: { sharp: "0.35.3" }` so astro's transitive copy
  resolves to the patched version too.

Post-fix: `pnpm audit` → "No known vulnerabilities found"; site build, full
build, lint, typecheck, 81 tests all green.

No changeset: site-only tooling, nothing published changes.
