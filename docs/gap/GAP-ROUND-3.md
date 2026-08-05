# GAP-ROUND-3 — production benchmark loop, round 3

Date: 2026-08-05. References this round: **production-baseline checklist items 3/4/6** measured against how mature CLIs (npm, gh, osv-scanner) behave on bad input, plus real error-path probing of attnbox itself.

## Evidence log (all real runs)

- **Perf at scale**: synthesized 1,000 Codex rollout sessions (20 events each) → `CodexCollector.collect()` = **34 ms, 6.6 MB heap** (Node 22). Real data: 103 sessions end-to-end `attnbox ls` = 0.21 s including Node startup + live Devin API call.
- **Node LTS**: full test suite (54 tests) + `attnbox ls` on real data pass on **Node 20.20.2** and **22.x** — but CI only ran Node 22.
- **Error-path probes** found three production-baseline violations:
  1. `attnbox --port <in-use>` printed a raw `listen EADDRINUSE: address already in use 127.0.0.1:4822` (mature CLIs print a readable message + a next step).
  2. `attnbox bogus-cmd` silently **started the daemon** instead of erroring (npm/gh: `unknown command` + help hint, exit 1).
  3. `DEVIN_API_KEY=badkey attnbox ls` silently dropped 100 cloud sessions (103 → 3 total) with **no warning** — the worst kind of silent false negative for an attention inbox.

## Gap list

| # | Mature CLI does | attnbox today | Priority |
|---|---|---|---|
| 1 | Unknown command → error + help hint, exit 1 | Starts the daemon | **P0** |
| 2 | Bad credentials → visible warning | Silently drops all cloud sessions | **P0** |
| 3 | Port in use → readable message + `--port` hint | Raw EADDRINUSE dump | P1 |
| 4 | Invalid port value rejected upfront | `Number(...)` NaN passed to listen | P1 |
| 5 | CI on both active Node LTS lines | Node 22 only | P1 |

## Round-3 fixes (this round)

- Unknown command → `attnbox: unknown command "x" — run \`attnbox --help\``, exit 1.
- Devin collector warns on HTTP 401/403: `check DEVIN_API_KEY` (still degrades gracefully to local-only).
- EADDRINUSE → `port N is already in use — is another attnbox running? Try \`attnbox --port <n>\``, exit 1; invalid port values rejected with a readable message.
- CI matrix: Node 20 + 22.

## Regression verdict

All three probes re-run: unknown command exits 1 with hint; bad key prints the warning and still lists local sessions; busy port prints the friendly message and exits 1. Perf/memory numbers recorded above satisfy baseline item 4 at 10× current real scale. Remaining honest gaps: no Windows verification (macOS/Linux only, documented), ack state per-browser (round-2 note), cloud act-in-place still link-out only. Round-4 candidates: macOS verification or CI runner, `attnbox doctor` self-check, cloud act-in-place (Devin message send).
