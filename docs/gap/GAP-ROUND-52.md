# GAP-ROUND-52 — 竞品深挖 + 文档跟上 rounds 46–50

Round 52. Driver dimensions: competitor research, user/data analysis.

## Competitor recon (source-level, ccmux main @ b2bc7d4)

- ccmux has grown beyond terminal heuristics: it now ships **hook/plugin
  adapters** for cursor (`daemon/adapters/cursor/hook-adapter`), copilot
  (`adapters/copilot/hook-adapter`) and opencode (`adapters/opencode/
  plugin-adapter`), plus non-interactive invoke modes (claude --print,
  codex exec, gemini -p, opencode run --format json) and session handoff
  between agents.
- Direction confirmed: authoritative (hook-based) status for local agents
  is the industry convergence point — the same architecture attnbox uses
  for claude/codex hooks.
- Implication for us: the highest-value coverage additions remain
  **cursor-agent** (installed here since round-23, still blocked on login
  credentials — re-flagged) and **opencode** (no local install/data on
  this box; adding a collector without real session data to verify against
  would violate the no-fabrication rule — deferred until real data
  exists).

## User/data analysis → docs drift (P1 for docs accuracy)

`inbox.md` still described pre-round-46 behavior: search scope said
"title, project, agent" (round-48 added the asking-preview), grouping
said "falls back to agent" with no mention of PR-repo attribution
(round-46) or activity ordering (round-47), and nothing said waiting
items link to the session (round-50). For a docs-driven product, docs
drift is a real trust bug.

## Fix

`inbox.md` updated: search scope, grouping semantics + ordering, and the
waiting→session / non-waiting→PR link rule.

## Honest boundary

opencode/cursor/copilot collectors stay out until real authoritative
data is available to test against; Omnigent unchanged at 0.8.2.
