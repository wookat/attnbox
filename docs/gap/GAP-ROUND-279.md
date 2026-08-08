# GAP-ROUND-279 — 本地采集器实弹抽查（纯文档）

Round 279. Driver dimension: local collector live-fire —
Claude / Codex / Gemini on-machine status derivation, first
since round-265.

## Evidence (v0.4.8, real CLI over synthetic fixtures with a
unique stamp, agent+stamp double-filtered assertions,
maxBuffer 128 MiB per the round-265 method note)

```text
claude waiting (unresolved tool_use): waiting/approve
  · detail carries the ask ("may I run rm -rf ./dist?")
claude working (tool result last):    working
claude idle    (assistant text):      idle
codex  waiting (exec_approval_request): waiting/approve
  · detail "wants to run: rm -rf ./dist"
codex  idle    (task_complete):        idle
gemini fresh mtime:  working · never claims waiting
gemini stale mtime:  idle    · never claims waiting
gemini ever waiting? false
residue after cleanup: 0
```

All three local collectors derive states exactly per contract:
Claude's three-state transcript heuristic round-trips, Codex
approval requests surface as waiting/approve with the command
preview and task_complete lands idle, and Gemini's mtime
heuristic only ever claims working/idle. Fixtures, temp script,
and probe artifacts removed — zero residue confirmed by a second
full CLI pass.

## Verdict

No P0/P1; docs-only, no changeset.
