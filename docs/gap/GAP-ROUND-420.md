# GAP-ROUND-420 — CLI 黄金路径复走（纯文档）

Round 420. Driver dimension: CLI golden-path re-walk
(`doctor` / `ls --waiting` / `hooks --install` four-state
sandbox), first since round-409. Live org @3,82x sessions.

## Evidence (v0.4.8)

`attnbox doctor` — seven lines, all correct:

```text
✓ node / claude-code (authoritative) / codex (hooks.json
  authoritative) / gemini (honest heuristic) / devin (API
  reachable, key valid)
– github-pr (no token — fallback inactive)
– webhook (URL not set — honest boundary note)
```

`attnbox ls --waiting` — warm run 2.8s at 3,82x sessions;
27 waiting items, every one with question preview and
session action link (+ PR secondary link where applicable).

`hooks --install` sandbox four states:

```text
1. empty HOME       → honest not-found for both agents
2. fresh install    → merged, *.attnbox-bak backups (2)
3. repeat           → already installed (idempotent)
4. corrupt settings → Claude merge rejected with manual
                      fallback pointer; Codex untouched
```

Sandbox removed; zero residue.

## Verdict

CLI golden path fully healthy. No P0/P1; docs-only, no
changeset.
