# GAP-ROUND-46 — 云端会话的项目归属（grouped 视图不再一坨 devin）

Round 46. Driver dimensions: user/data analysis, UX walkthrough.

## Evidence sweep

Live dogfood: 100 of 106 sessions are Devin, and **0** of them carried
project metadata — the ⊞ grouped view collapsed the entire cloud fleet
into a single useless "devin" group while 6 local sessions grouped nicely
by directory.

Devin's sessions API does expose a `pull_request.url` per session; on the
real dataset 58/100 sessions have one.

## Gap (P1)

Grouping is a headline triage feature (round-2), but it was effectively
broken for the dominant agent in real usage: one giant bucket, no way to
scan "what does repo X need from me".

## Fix

`DevinCollector` now derives `project` from the PR URL
(`projectFromPrUrl`: `https://github.com/o/r/pull/N` → `o/r`, GitLab
`merge_requests` too). Real data: 58/100 Devin sessions now group across
10 real repos; the rest keep the agent fallback.

## Evidence after fix

- unit tests: PR-url → project derivation (GitHub, GitLab, none) + collect
  mapping (84 tests green);
- live daemon: `devin with project: 58 / 100` across
  `wookat/sourcepilot` (11), `wookat/recruit_app` (10), … 10 repos.

## Honest boundary

Sessions without a PR (42/100 here) still fall back to the "devin" group —
the API exposes no repo before a PR exists. `tags` exist but are
free-form; not treated as project.
