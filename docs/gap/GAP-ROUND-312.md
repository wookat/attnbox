# GAP-ROUND-312 — CLI 黄金路径复走（纯文档）

Round 312. Driver dimension: CLI golden path — `doctor`,
`ls --waiting`, `hooks --install` four-state sandbox, first
since round-302.

## Evidence (v0.4.8, live org @~3,555 sessions)

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

`attnbox ls --waiting` — 3.0 s wall time at ~3,555 sessions;
every waiting item shows agent, attention type, waiting age,
detail preview, session URL, and PR secondary link where one
exists.

`hooks --install` sandbox, four states:

```text
missing dirs:      both guards fire
valid configs:     merged with .attnbox-bak backups; pre-existing
                   user PreToolUse hook preserved
idempotent rerun:  "hooks already installed"
corrupt config:    refuses to merge; corrupt file left byte-identical
```

Sandbox and temp files removed; no probe residue.

## Verdict

No P0/P1; docs-only, no changeset.
