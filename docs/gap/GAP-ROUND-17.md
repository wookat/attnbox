# GAP-ROUND-17 — production benchmark loop, round 17

Date: 2026-08-05. Reference: **docs freshness as a production criterion** (baseline #5: docs match implementation). Rounds 14/16 shipped waiting-item previews across all three agents; the site's "Using the inbox" page didn't mention them, so a new user wouldn't know the inbox already answers "waiting for what?".

## Gap list

| # | Standard | attnbox today | Priority |
|---|---|---|---|
| 1 | Docs describe shipped behavior | previews (rounds 14/16) undocumented on the site | P1 |
| 2 | Mobile-first is a hard acceptance criterion | previews unverified on mobile viewport | check |

## Round-17 fix

- Site "Using the inbox": new "What is it waiting for?" section — per-agent preview sources (Devin last agent message via read-only API, Claude last assistant transcript text, Codex pending approval) and the `ls` `└` line.
- Mobile regression: real daemon, 390×844 — previews render cleanly under titles (`line-clamp-2`), no overflow (screenshot captured).

Docs-only; site build green. Pages redeploy after merge.

## Regression verdict

Docs match implementation again; preview UX verified mobile-first. Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY, heuristic misjudgment quantification).
