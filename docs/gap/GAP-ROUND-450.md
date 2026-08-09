# GAP-ROUND-450 — 本地采集器实弹抽查（纯文档）

Round 450. Driver dimension: local collector live-fire
spot check (Claude Code / Codex / Gemini status
verdicts against real on-disk fixtures), first since
round-439. Fixtures per the round-428 method notes
(`claude-code:<sessionId>` IDs; Codex rollout under
`sessions/YYYY/MM/DD/` with `session_meta`), stamped
`r450probe` and matched by exact ID.

## Evidence (v0.4.8, collectors 0.2.7)

```text
Claude unresolved tool_use   → waiting/approve
Claude matching tool_result  → working (waiting cleared)
Codex exec_approval_request  → waiting/approve
  detail = wants to run: bash -c npm publish
Codex task_complete          → idle (approval cleared)
Gemini fresh mtime           → working
Gemini stale (3h)            → idle
Gemini waiting anywhere      → 0 (never claims waiting)
cleanup residue              → 0
```

All three collectors' source-specific semantics hold:
Claude transcript heuristic round-trips waiting↔working
on tool_use/tool_result; Codex approval surfaces with a
command preview and is only cleared by a task event;
Gemini's mtime evidence honestly never claims waiting.

## Verdict

No P0/P1; docs-only, no changeset.
