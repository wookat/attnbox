# GAP-ROUND-331 — CLI 黄金路径复走（纯文档）

Round 331. Driver dimension: CLI golden-path re-walk —
`doctor` / `ls --waiting` / `hooks --install` four-state
sandbox, first since round-322, at the largest scale to date
(3,605 sessions). Real CLI against the live org plus an
isolated `HOME` sandbox.

## Evidence (v0.4.8)

`doctor` (seven lines, all honest):

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
✓ codex        sessions found, hooks.json installed (authoritative)
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive
– webhook      ATTNBOX_WEBHOOK_URL not set — no push channel
```

`ls --waiting --json` @3,605 sessions:

```text
real 4.9s · 24 waiting · 24/24 detail · 24/24 url
```

`hooks --install` sandbox four-state:

```text
state 1 missing dirs:   honest "– not found" lines, zero writes
state 2 valid configs:  merged with *.attnbox-bak backup ·
                        pre-existing user hook preserved (1 hit)
state 3 idempotent:     "already installed" · settings.json
                        byte-identical on re-run
state 4 corrupt config: refuses to merge with actionable "!"
                        message · corrupt file byte-identical
```

All contracts hold. Sandbox and temp files removed.

## Verdict

No P0/P1; docs-only, no changeset.
