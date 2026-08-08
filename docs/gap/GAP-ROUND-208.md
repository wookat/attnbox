# GAP-ROUND-208 — CLI 黄金路径复走（纯文档）

Round 208. Driver dimension: CLI golden paths — `doctor` /
`ls --waiting` / `hooks --install` three-state sandbox (first since
round-193, now ~3,236 sessions).

## Evidence (v0.4.8, real environment)

### doctor

All seven lines correct: node / claude-code (hooks authoritative) /
codex (hooks.json authoritative) / gemini (heuristic-only honesty
line) / devin (API reachable, key valid) / github-pr and webhook
correctly reported as inactive-by-configuration.

### ls --waiting

`9 waiting on you · 59 working · 3236 total` in **3.6 s**; every
waiting item carries a "what it's asking" preview plus session URL
(and PR secondary link where present) — 13 action links across 9
items.

### hooks --install (isolated-HOME sandbox, round-193 method)

1. Fresh install: merges into `.claude/settings.json` + codex
   `hooks.json`, writes `.attnbox-bak` backups, prints
   restart-then-doctor guidance.
2. Re-run: both report "already installed" (idempotent).
3. Corrupt `settings.json`: refuses the merge with a manual-fix
   pointer, codex half unaffected; corrupt file left byte-identical.

Sandbox removed after the run.

## Verdict

All CLI golden paths healthy at grown scale. No P0/P1; docs-only,
no changeset.
