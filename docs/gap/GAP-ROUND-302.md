# GAP-ROUND-302 — CLI 黄金路径复走（纯文档）

Round 302. Driver dimension: CLI golden path — doctor /
`ls --waiting` / hooks installer sandbox states, first since
round-295.

## Evidence (v0.4.8, live data @3,480 sessions)

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

`ls --waiting`: 3.2 s at 3,480 sessions, 12 waiting on you · 46
working, every waiting row with a "what it's asking" preview and
a session action link — within the historical envelope
(2.7–5.6 s).

`hooks --install`, isolated-HOME sandbox, four states:

```text
missing dirs:      both guards fire ("~/.claude not found …")
valid configs:     merged with .attnbox-bak backups; pre-existing
                   user PreToolUse hook preserved (1 match after merge)
idempotent rerun:  "hooks already installed" both agents, no rewrite
corrupt config:    refuses to merge, points at manual path; the
                   corrupt file is left byte-identical ("{bad json")
```

Sandbox removed after the probe; no residue.

## Verdict

No P0/P1; docs-only, no changeset.
