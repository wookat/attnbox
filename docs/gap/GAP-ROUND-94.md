# GAP-ROUND-94 — doctor 的 GitHub 探活误报：改探采集器真实端点

Round 94. Driver dimension: real testing — first live exercise of the
`github-pr` path on this box surfaced a doctor false negative.

## Found (P1, diagnosis-surface correctness)

With a GitHub App/installation token (this box's `gh auth token`):

- the collector's actual endpoint
  `GET /search/issues?q=is:pr is:open review-requested:@me` → **200**
  (fallback fully functional);
- doctor's probe `GET /user` → **403** ("Resource not accessible by
  integration") → doctor printed
  `! github-pr API returned HTTP 403 — check ATTNBOX_GITHUB_TOKEN` —
  telling the user their working token is broken.

`/user` requires a user-identity scope that app/installation tokens
and some fine-grained PATs don't carry; the search endpoint is the
only thing the collector needs.

## Fix

Doctor now probes the exact review-requested search endpoint
(`per_page=1`) the collector uses. Verified live: same token now
reports `✓ github-pr token valid`. Unit test pins the probed URL
(search/issues + review-requested:@me, never /user).

## Verdict

97 tests green. attnbox patch changeset (now 2 accumulated:
round-86 ls age + this).
