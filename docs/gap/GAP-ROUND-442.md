# GAP-ROUND-442 — CLI 黄金路径复走（纯文档）

Round 442. Driver dimension: CLI golden path (doctor /
`ls --waiting` / `hooks --install` four states), first
since round-431. Live org @3,86x sessions.

## Evidence (v0.4.8)

`doctor` — seven lines, all correct: node v22.23.2;
claude-code + codex authoritative hooks; gemini honest
heuristic; devin API reachable/key valid; github-pr and
webhook honestly inactive (env not set).

`ls --waiting` — warm run 2.8s @3,86x sessions, 19
waiting items, every one with preview detail + session
action link (+ PR secondary links where derivable).

`hooks --install` sandbox four states:

```text
empty HOME             → honest not-found for both agents
dirs present           → merged + .attnbox-bak backups
second run             → idempotent "already installed"
corrupt settings.json  → refused with manual-merge hint,
                         codex unaffected
```

Sandbox removed; no residue.

## Verdict

CLI golden paths fully healthy at the largest-yet scale.
No P0/P1; docs-only, no changeset.
