# GAP-ROUND-15 — production benchmark loop, round 15

Date: 2026-08-05. Reference: **any mature npm package** (checked: `zod`, `chalk`, `execa`) — the npm page is the first impression, with a README, description and keywords. Registry check (`registry.npmjs.org/attnbox-core` → `readme: ''`) showed all four attnbox packages published with **blank npm pages**, and core/collectors/daemon had no `description`/`keywords` at all.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | npm page shows README with usage | all four packages: blank | **P1** |
| 2 | `description`/`keywords` for search/listing | cli only | P1 |

## Round-15 fix

- Per-package `README.md` (npm includes README automatically; verified via `npm pack --dry-run` → `508B README.md`): `attnbox` (full quick start + principles), `attnbox-core` (types), `attnbox-collectors` (per-agent adapters + read-only guarantees), `attnbox-daemon` (localhost API surface). Each links to https://attnbox.zalize.com and the honest limits page.
- `description` + `keywords` added to core/collectors/daemon package.json.

Takes effect on npm with the next publish; no code changes.

## Regression verdict

npm pages will match mature-package expectations after the next release. Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY, heuristic misjudgment quantification).
