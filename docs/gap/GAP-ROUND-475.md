# GAP-ROUND-475 — CLI 黄金路径复走（纯文档）

Round 475. Driver dimension: CLI golden-path re-walk
(doctor / ls --waiting / hooks --install four
states), first since round-464.

## Evidence (v0.4.8, main, live org 3,928 sessions)

```text
doctor      → seven lines all correct: node ✓,
              claude-code hooks authoritative ✓,
              codex hooks.json authoritative ✓,
              gemini heuristic-honest ✓, devin API
              key valid ✓, github-pr fallback
              honestly inactive –, webhook channel
              honestly unset –
ls --waiting→ warm run 3.5s @3,92x sessions; all 14
              waiting items carry preview + session
              link (+ PR secondary link where known)
hooks --install sandbox four states:
  fresh HOME      → honest "not installed" skips
  first install   → merged with .attnbox-bak backup
  idempotent rerun→ "already installed", no rewrite
  corrupt JSON    → refused, original file untouched
```

Existing user keys (`model`) preserved through the
merge.

Cleanup: sandbox HOME removed.

## Verdict

CLI golden paths all healthy at the largest scale
yet. No P0/P1; docs-only, no changeset.
