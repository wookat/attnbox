# GAP-ROUND-12 — production benchmark loop, round 12

Date: 2026-08-05. Reference: **`brew doctor` / `gh` docs** — a diagnostic command users are told to run deserves a public page explaining what each line means and what to do about it. After rounds 8–11 the site prescribed `attnbox doctor` (hooks page, quickstart) but never documented it, and LIMITS didn't reflect the round-11 credential-failure contract for github-pr.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | brew/gh document their doctor/status output line by line | doctor referenced twice on the site, documented nowhere | **P1** |
| 2 | LIMITS reflects actual failure behavior | github-pr row predates round-11 warning/probe | P1 |

## Round-12 fix

- New site page `/doctor/` ("Troubleshooting with doctor"): example output, what each check actually verifies (hooks state, live credential probes, gemini honesty), exit-code contract; added to sidebar.
- `docs/LIMITS.md` github-pr row: bad tokens warn on stderr + doctor live-probes — never silent data loss.

Docs-only; site build green. Will redeploy Pages after merge (direct-upload project, deploy via wrangler).

## Regression verdict

Diagnostic loop is now closed in public docs: doctor prescribes `hooks --install`, the site explains both. Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY).
