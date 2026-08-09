# GAP-ROUND-354 — CLI 黄金路径复走（纯文档）

Round 354. Driver dimension: CLI golden-path re-walk
(`doctor` / `ls --waiting` / `hooks --install` four-state
sandbox), first since round-343. Real CLI against the live org.

## Evidence (v0.4.8)

`attnbox doctor` — all seven lines correct:

```text
✓ node / ✓ claude-code (hooks authoritative) / ✓ codex
  (hooks.json authoritative) / ✓ gemini (heuristic, never
  claims waiting) / ✓ devin (API reachable, key valid)
– github-pr (no token, fallback inactive)
– webhook (ATTNBOX_WEBHOOK_URL not set)
```

`ls --waiting`: 3.0 s at ~3,66x sessions; 19 waiting items,
each with detail preview + session/PR action links (27 URLs).

`hooks --install` sandbox four states (fresh `$HOME`):

```text
1 fresh install:        exit 0, hooks written
2 idempotent re-run:    exit 0, no duplicate
3 existing settings:    exit 0, user keys preserved
                        (model:"opus" intact), .attnbox-bak
                        backup written
4 corrupt settings:     exit 1, refuses to merge, file left
                        untouched
```

## Verdict

Golden path fully green at record scale. No P0/P1; docs-only,
no changeset.
