# GAP-ROUND-343 — CLI 黄金路径复走（纯文档）

Round 343. Driver dimension: CLI golden-path re-walk — `doctor`,
`ls --waiting`, `hooks --install` four-state sandbox, first since
round-331. Real installed CLI against the live org.

## Evidence (v0.4.8)

doctor:

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
✓ codex        sessions found, hooks.json installed (authoritative)
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive
– webhook      ATTNBOX_WEBHOOK_URL not set — no push channel
```

CLI:

```text
real 2.8s · 13 waiting · 13/13 detail · 13/13 url
```

Hooks sandbox (isolated HOME):

```text
state 1 missing dirs:   honest “– not found” lines, zero writes
state 2 valid configs:  merged with *.attnbox-bak backup ·
                        pre-existing user hook preserved
state 3 idempotent:     “already installed” · settings.json byte-identical
state 4 corrupt config: refuses to merge · corrupt file byte-identical
```

Sandbox and temp files removed.

## Verdict

All golden paths healthy at ~3,6xx sessions. No P0/P1; docs-only,
no changeset.
