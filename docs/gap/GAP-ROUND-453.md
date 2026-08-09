# GAP-ROUND-453 — CLI 黄金路径复走（纯文档）

Round 453. Driver dimension: CLI golden-path re-walk
(`doctor`, `ls --waiting`, `hooks --install` sandbox
four-state), first since round-442, at 3,89x live
sessions.

## Evidence (v0.4.8)

`attnbox doctor` — all seven lines correct:

```text
✓ node / claude-code (authoritative) /
  codex (hooks.json authoritative) /
  gemini (heuristic, never waiting) /
  devin (API reachable, key valid)
– github-pr (no token, honest inactive)
– webhook (unset, honest no-push note)
```

`attnbox ls --waiting` — warm run 5.0s @3,89x
sessions; every waiting item carries a "what it's
asking" preview line plus session URL (and PR
secondary link where applicable).

`attnbox hooks --install` sandbox four-state:

```text
1 fresh (no ~/.claude/~/.codex) → honest not-found
2 idempotent rerun              → same honest output
3 existing user settings.json   → merged + .attnbox-bak
                                  backup · unrelated
                                  keys preserved
4 corrupt settings.json         → refused ("could not
                                  merge … fix or merge
                                  manually") · file
                                  left untouched
```

Sandbox removed after the probe.

## Verdict

All CLI golden-path contracts hold. No P0/P1;
docs-only, no changeset.
