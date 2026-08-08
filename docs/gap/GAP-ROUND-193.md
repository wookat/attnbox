# GAP-ROUND-193 — CLI 黄金路径复走（纯文档）

Round 193. Driver dimension: CLI golden path — `doctor` /
`ls --waiting` / `hooks --install` three-state re-walk (first since
round-181, now ~3,191 sessions).

## Evidence (v0.4.8)

- **doctor**: all seven lines correct — node ✓, claude-code hooks
  authoritative ✓, codex hooks.json authoritative ✓, gemini honest
  heuristic ✓, devin API key valid ✓, github-pr fallback inactive
  (–, no token set), webhook not set (–).
- **ls --waiting**: 3.2 s at 3,191 sessions (27 waiting / 67
  working) — every waiting item carries the question preview,
  session URL, and PR secondary link. On par with round-181's
  2.7 s @3,135.
- **hooks --install three states** (isolated `$HOME` sandbox):
  1. fresh install → merged with `.attnbox-bak` backups, codex
     `codex_hooks = true` set;
  2. idempotent rerun → "already installed", no rewrite;
  3. corrupt `settings.json` → refuses to merge with a clear
     manual-fix message and leaves the broken file untouched.
  Also verified the guard path: missing `~/.claude` / `~/.codex`
  yields a friendly "is it installed?" notice. Sandbox removed.

## Verdict

CLI golden path fully healthy at grown scale. No P0/P1; docs-only,
no changeset.
