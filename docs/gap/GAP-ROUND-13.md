# GAP-ROUND-13 — production benchmark loop, round 13

Date: 2026-08-05. Reference: **production baseline #2** — "correctness verified on real data, false positives/negatives quantified". Rounds so far validated behaviors; this round quantifies status-mapping correctness end-to-end against the source of truth on a live 104-session workspace (v0.1.0 code on main).

## Method

- `attnbox ls --json` snapshot vs. raw `GET api.devin.ai/v1/sessions` taken back-to-back.
- Local agents (claude-code, codex: authoritative hooks; gemini: heuristic) checked against actual machine state (no live local sessions running).
- Live web inbox against the same daemon, plus ack persistence across a daemon restart.

## Results

| Source | attnbox reported | Source of truth | Mismatches |
|---|---|---|---|
| Devin (authoritative) | 84 done / 9 working / 7 waiting | 84 `finished` / 9 `working` / 7 `blocked` | **0** — 100/100 sessions exact |
| claude-code (hooks) | 1 idle | no live session | 0 |
| codex (hooks) | 1 idle | no live session | 0 |
| gemini (heuristic) | 2 idle | no live session | 0 |
| Ack persistence | earlier-acked waiting item stayed excluded from `summary.waiting` after daemon restart | `~/.attnbox/acked.json` | 0 |

False positives: 0. False negatives: 0 (this snapshot; heuristic-mode local agents under active sessions remain the known softer case — documented in LIMITS, upgradeable via `hooks --install`).

Web inbox screenshot (7 real waiting Devin sessions, reply affordances present) captured as evidence.

## Gap list

No new P0/P1. Numbers recorded in `docs/MATURITY.md` (Real-world validation row).

## Regression verdict

Authoritative-path correctness is quantified and clean at real scale. Carried gaps unchanged: macOS verification, Cursor/Copilot credentials, `GEMINI_API_KEY`, and quantifying heuristic-mode misjudgment rates under live local sessions (needs an active work period with hooks disabled — future round).
