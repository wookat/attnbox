# GAP-ROUND-20 — production benchmark loop, round 20

Date: 2026-08-05. Reference: **API-client hygiene of mature integrations (gh, octokit)** — bound your request fan-out; never let one poll cycle's cost scale unbounded with server-side state.

## Gap list

| # | Standard | attnbox today | Priority |
|---|---|---|---|
| 1 | Bounded per-cycle API cost | Devin detail fan-out = one `GET /session/{id}` per *uncached* blocked session per cycle — a workspace with dozens of blocked sessions could burst on daemon start or mass state change | P2 (hardening) |

Cache-by-`updated_at` (round 14) already makes steady state cheap; this round bounds the cold/burst path.

## Round-20 fix

`MAX_DETAIL_FETCHES_PER_CYCLE = 10`: at most 10 uncached detail lookups per collect cycle; uncapped sessions simply catch up on subsequent 3-second cycles (their cache entry isn't poisoned — they retry until fetched). With this machine's real workspace (13 blocked), full previews are available within two cycles.

## Evidence

79 tests green (new: 15 blocked sessions → exactly 10 detail calls on cycle 1, all 15 by cycle 2).

## Regression verdict

Worst-case burst is now 1 list + 10 detail requests per cycle regardless of workspace size. Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY, heuristic misjudgment quantification, npm README registry-field rendering pending CEO eyeball).
