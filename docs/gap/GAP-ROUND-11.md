# GAP-ROUND-11 — production benchmark loop, round 11

Date: 2026-08-05. Reference: **our own round-3 standard** (a bad `DEVIN_API_KEY` must warn, never silently drop data) audited against the remaining cloud collector. Probing `GITHUB_TOKEN=badtoken` showed the github-pr fallback silently returning zero review requests — the exact silent-data-loss class round 3 eliminated for Devin — and `attnbox doctor` reported a bad token as `✓ token set`.

## Gap list

| # | Standard | attnbox today | Priority |
|---|---|---|---|
| 1 | Bad cloud credentials warn on stderr (devin does since round 3) | github-pr: 401/403 → silent `[]` | **P0** |
| 2 | doctor live-probes credentials (devin does since round 4) | github-pr: only checks the env var exists | **P0** |

## Round-11 fix

- `GithubReviewCollector`: 401/403 now logs `attnbox: github-pr collector: HTTP <status> — check ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN` on stderr (other failures stay silently degraded, matching devin).
- `attnbox doctor`: github-pr check now probes `GET /user` — valid token `✓ token valid`, bad token `! API returned HTTP <status>`, network failure `! API unreachable — review-requested fallback degraded`.

## Evidence

Real-machine probe with `GITHUB_TOKEN=badtoken`:

```text
! github-pr    API returned HTTP 401 — check ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN   (doctor, exit 1)
attnbox: github-pr collector: HTTP 401 — check ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN (ls, stderr)
```

73 tests green (new: collector 401 warning; doctor good/bad/down token triad).

## Regression verdict

Both cloud collectors now share the same credential-failure contract: warn loudly, degrade safely, doctor tells the truth. Remaining carried gaps: macOS verification, Cursor/Copilot credentials, `GEMINI_API_KEY`.
