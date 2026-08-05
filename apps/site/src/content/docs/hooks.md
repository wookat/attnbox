---
title: Authoritative hooks
description: Upgrade Claude Code and Codex CLI from heuristic to authoritative status.
---

By default, local agent status is inferred from their session logs — good, but heuristic. Both Claude Code and Codex CLI can *tell* attnbox their state directly. One command sets it all up:

```bash
npx attnbox hooks --install   # idempotent; originals backed up as *.attnbox-bak
```

It merges the hooks into your existing configs without touching anything else, skips agents that aren't installed, and refuses (rather than overwrites) a config it can't parse. Restart your agent sessions afterwards and run `npx attnbox doctor` to verify. Prefer to review first? `npx attnbox hooks` prints the snippets for manual merging:

## Claude Code

Merge the printed JSON into `~/.claude/settings.json`. Claude's own lifecycle hooks then drive status:

- `Notification` → **waiting** (`approve` if it's a permission prompt, else `answer`)
- `Stop` → **idle**
- `UserPromptSubmit` → **working**

## Codex CLI

Preferred: merge the printed JSON into `~/.codex/hooks.json` and enable the feature flag in `~/.codex/config.toml`:

```toml
[features]
codex_hooks = true
```

Codex lifecycle hooks then drive status authoritatively:

- `PermissionRequest` → **waiting** (`approve`) — the moment Codex asks for approval
- `Stop` → **idle** (turn finished, ready for your next prompt)
- `UserPromptSubmit` → **working**

Fallback (older Codex, turn-complete only): add the printed `notify` line to `~/.codex/config.toml`:

```toml
notify = ["attnbox", "hook", "codex"]
```

## How it works

Hook events are persisted as tiny JSON files under `~/.attnbox/hooks/`. Collectors prefer hook state over log heuristics whenever it is fresher; items upgraded this way are tagged `authoritative` in the inbox. Hooks never block or fail your agent — errors are swallowed by design.
