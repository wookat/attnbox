---
title: Troubleshooting with doctor
description: Diagnose collector status, credentials and authoritative mode in one command.
---

When the inbox looks emptier than it should, ask attnbox itself:

```bash
npx attnbox doctor
```

Each collector reports one line — `✓` fully active, `!` degraded with the exact fix, `–` inactive by configuration:

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
! codex        sessions found, heuristic only — run `attnbox hooks --install` to upgrade
✓ gemini       found (heuristic working/idle only, never claims waiting)
! devin        API returned HTTP 401 — check DEVIN_API_KEY
– github-pr    no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive
```

What it actually checks:

- **claude-code / codex** — session files present, and whether the authoritative hooks are installed (fix: [`attnbox hooks --install`](/hooks/)).
- **devin / github-pr** — the key/token is probed against the live API, so an expired or mis-scoped credential shows up here instead of silently emptying your inbox. Both collectors also warn on stderr at runtime when a request comes back 401/403.
- **gemini** — presence only; local files carry no reliable waiting marker, so attnbox never claims more than working/idle here (see [limits](/limits/)).

The exit code is `1` when anything is degraded (`!`), so `attnbox doctor` works in scripts and CI shells too.
