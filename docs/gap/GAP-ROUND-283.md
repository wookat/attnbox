# GAP-ROUND-283 — CLI 黄金路径复走（纯文档）

Round 283. Driver dimension: CLI golden paths — real `doctor`,
`ls --waiting`, and `hooks --install` four-state sandbox suite,
first since round-272.

## Evidence (v0.4.8, live org @3,444 sessions)

### doctor

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
✓ codex        sessions found, hooks.json installed (authoritative waiting/approve)
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    honestly inactive (no token)
– webhook      honestly inactive (ATTNBOX_WEBHOOK_URL not set)
```

### ls --waiting

```text
12 waiting on you · 60 working · 3,444 total
wall time: 2.8s
previews: 24 └ lines · action links: 12/12 session URLs
```

Every waiting item carries its detail preview and session link;
wall time inside the historical envelope (2.8–5.4s).

### hooks --install four-state sandbox

```text
fresh:      claude merge + backup · codex merge + flag set
idempotent: both "already installed"
corrupt:    refuses merge, original file preserved verbatim
missing:    honest not-found guidance for both agents
```

Sandboxes removed after the run; no fixture residue.

## Verdict

No P0/P1; docs-only, no changeset.
