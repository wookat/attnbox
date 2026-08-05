# GAP-ROUND-26 — production benchmark loop, round 26

Date: 2026-08-05. Post-v0.2.1 release-closure round plus one honesty fix.

## Release closure (v0.2.1)

- Registry `readme` fields now nonempty: attnbox 1191 B / attnbox-collectors 970 B / attnbox-daemon 574 B (previously 0) — the `pnpm pack` + `npm publish <tarball>` procedure fixed the blank npm pages while keeping `workspace:*` ranges rewritten.
- Clean-env `npx attnbox@0.2.1`: help, `ls --waiting` with previews, unknown-command exit 1, daemon web 200 with 104 real sessions, shipped `sw.js` contains the ✓ Done handler.
- npmjs.com visual check still blocked by a Cloudflare challenge loop from this machine; the registry API evidence stands on its own.

## Honesty gap found and fixed

Rounds 19/23/24 made notifications a headline feature without stating the delivery boundary: notifications fire **only while the inbox is open somewhere** (tab or installed PWA). attnbox deliberately has no Web Push server — push would relay agent activity through a third-party push service, contradicting local-first. LIMITS (repo + site) now state this: if nothing has the inbox open, nothing notifies; items are still waiting when you return.

## Carried gaps

Unchanged: Gemini key; Cursor login (cursor-agent installed, credential requested); Copilot access; macOS; heuristic FP/FN quantification.
