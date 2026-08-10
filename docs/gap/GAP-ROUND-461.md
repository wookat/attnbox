# GAP-ROUND-461 — 本地采集器实弹抽查（纯文档）

Round 461. Driver dimension: local collector
live-fire spot check (Claude / Codex / Gemini
source-specific status determination), first since
round-450. Controlled fixtures against the compiled
collectors (`ClaudeCollector` / `CodexCollector` /
`GeminiCollector`), agent+stamp filtered, removed
after each probe.

## Evidence (attnbox-collectors 0.2.7)

```text
claude tool_use (unresolved)   → waiting/approve
claude matching tool_result    → working (cleared)
codex exec_approval_request    → waiting/approve,
                                 command preview in
                                 detail (true)
codex task_complete            → idle (approval
                                 cleared by task
                                 event, per contract)
gemini fresh logs.json mtime   → working, never
                                 claims waiting
```

Round-428 fixture method notes re-verified: Claude
agent name `claude-code`, IDs `claude-code:<sessionId>`;
Codex rollout must live under `sessions/YYYY/MM/DD/`
with `session_meta`; Gemini IDs `gemini:<dir-name>`.

Cleanup: all fixtures removed, zero residue in
`~/.claude/projects`, `~/.codex/sessions`,
`~/.gemini/tmp`.

## Verdict

All three collectors judge status correctly on live
fixtures. No P0/P1; docs-only, no changeset.
