# GAP-ROUND-168 — 第十一批竞品扫描（纯文档）

Round 168. Driver dimension: competitor research — watchlist
(kookr / ccmux / coslash / herdr-line) + new-entrant sweep (first
since round-159). Authenticated `gh api` throughout.

## Watchlist findings

- **kookr-ai/kookr** (3★): still extremely high-cadence — 15+
  commits on 2026-08-07 alone (Sweep confirm-dialog focus trap +
  Escape-to-close, plugin-dir contract tests, compact task-tail
  serialization, quotaHeadroomThreshold tuning). All local/operator
  surface; no cloud-agent aggregation signal.
- **epilande/ccmux** (117★): opencode float-second timestamp fix,
  TUI dialog unification, and `feat(skills): split relay skill out
  of dispatch` — the handoff/relay surface keeps evolving
  (round-138 observation direction), still single-machine local.
- **centauri-ai/coslash** (1★): wrote its v0.0.1 README — positions
  itself verbatim as "The attention layer for coding agents";
  current commits are git-commit-watching mechanics (amend
  detection, heredoc parsing). Local-only, no cloud.
- **misty-step/kelpie** (1★): desktop sprint continues (composer
  layout matched pixel-close to Codex desktop, provider/model/
  reasoning indicators). Still herdr-bound phone-first console.
- herdr-island itself: no longer resolvable by the previous name in
  search; no new pushes surfaced.

## New-entrant sweep (3-day window)

Keyword sweep (attention inbox / "waiting on you" / coding-agents
triage/notify, created ≥ 2026-08-05): nothing in-scope — one support
-ticket triage bot and the known claude-notify Telegram pinger.
Second consecutive quiet window.

## Verdict

Track remains bipolar (runtime-ecosystem satellites vs single-
runtime local tools); cross-runtime + cloud zero-intrusion
aggregation still uncontested. No P2 trigger, no P0/P1; docs-only,
no changeset. `docs/COMPARISON.md` updated with the batch-11 note.
