# GAP-ROUND-32 — production benchmark loop, round 32

Date: 2026-08-05. Target: the longest-carried correctness gap — **heuristic false-positive/false-negative quantification** for the local Claude/Codex transcript heuristics.

## What was attempted

Ground truth = hook-recorded state (authoritative) for the same session the heuristic judges from the transcript. Plan: run real agent sessions with `attnbox hooks --install` active, then compare.

Blocked on this machine, honestly measured:

- `claude -p …` → `Not logged in · Please run /login`
- `codex exec …` → `401 Unauthorized` (no OpenAI auth)
- Existing hook state dirs (`~/.attnbox/hooks/{claude,codex}`) are empty — the one local Claude and one Codex session predate hook install.

So there are **zero authoritative samples** available; fabricating transcripts would not be a real-data measurement and was not done.

## What shipped instead

`scripts/heuristic-audit.mjs` — a one-command audit harness: collects each local agent's sessions twice (hooks dir real vs. empty), joins by session id, and prints a per-agent confusion matrix (`hookStatus -> heuristicStatus`) plus agreement rate over every hook-tracked session. Verified end-to-end on this machine (correctly reports 0-sample state with guidance). `docs/LIMITS.md` now points at it so the unquantified-heuristics limit is actionable, not just stated.

## External resource request (renewed)

To produce a real number: authenticated `claude` (login or `ANTHROPIC_API_KEY`) and/or `codex` (`OPENAI_API_KEY` / ChatGPT login) on the box where the audit runs; then a normal working session or two with hooks installed gives the sample.

## Honest assessment

The gap is *narrowed* (measurement is now one command, and it's in the repo for any user to run on their own real workload) but *not closed* — no agreement number exists yet. No competitor publishes such a number either; shipping the audit tool keeps our honesty edge.

## Carried gaps

Unchanged otherwise: Gemini key; Cursor login (requested); Copilot; macOS.
