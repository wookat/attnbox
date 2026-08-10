# GAP-ROUND-472 — 本地采集器实弹抽查（纯文档）

Round 472. Driver dimension: local collector
live-fire spot check (Claude / Codex / Gemini status
determination against real fixture files under the
collectors' authoritative home paths), first since
round-461.

## Evidence (v0.4.8, main)

```text
claude tool_use (unresolved) → waiting/approve
claude matching tool_result  → working (waiting
                               cleared)
codex exec_approval_request  → waiting/approve,
                               detail carries the
                               command preview
                               ("wants to run:
                                rm -rf dist")
codex task_complete          → idle
gemini fresh logs.json mtime → working, never claims
                               waiting (asserted)
```

Method notes from rounds 428/461 re-verified: Claude
agent name is `claude-code` (item IDs
`claude-code:<sessionId>`); Codex rollout fixture
must live under `sessions/YYYY/MM/DD/` and carry
`session_meta` for a sessionId, else skipped by
design; Gemini item IDs use the tmp directory name.

Cleanup: all fixtures removed from
`~/.claude/projects`, `~/.codex/sessions`,
`~/.gemini/tmp` — zero residue confirmed.

## Verdict

All three local collectors' source-specific status
semantics hold. No P0/P1; docs-only, no changeset.
