# GAP-ROUND-464 — CLI 黄金路径复走（纯文档）

Round 464. Driver dimension: CLI golden-path re-walk
(`doctor`, `ls --waiting`, `hooks --install` sandbox
four-state), first since round-453, at 3,91x live
sessions.

## Evidence (v0.4.8)

`attnbox doctor` — all seven lines correct:

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
✓ codex        sessions found, hooks.json installed (authoritative waiting/approve)
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive
– webhook      ATTNBOX_WEBHOOK_URL not set — no push channel while the inbox is closed
```

`attnbox ls --waiting` — warm run 3.2s @3,91x
sessions; every waiting item carries a "what it's
asking" preview line, waiting age, and session URL
(plus PR secondary link where applicable).

`attnbox hooks --install` sandbox four-state:

```text
fresh HOME          → honest not-found for both agents
idempotent rerun    → same honest not-found, no writes
existing config     → hooks merged + settings.json.attnbox-bak
                      created; unrelated key ("model")
                      preserved
corrupt settings.json → merge refused with actionable
                      message; original file left
                      byte-identical
```

Cleanup: sandbox removed.

## Verdict

CLI golden path fully healthy at record scale. No
P0/P1; docs-only, no changeset.
