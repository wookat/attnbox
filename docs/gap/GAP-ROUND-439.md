# GAP-ROUND-439 — 本地采集器实弹抽查（纯文档）

Round 439. Driver dimension: local collector live-fire
spot-check (Claude / Codex / Gemini status determination),
first since round-428. Real fixtures under the live HOME,
read by the real CLI (`ls --all --json`, large maxBuffer),
agent+stamp double filtering per method notes.

## Evidence (v0.4.8)

```text
Claude unresolved tool_use → waiting/approve
Claude matching tool_result → working (waiting cleared)
Codex exec_approval_request → waiting/approve
  detail = "wants to run: bash -c npm publish"
Codex task_complete → idle (pendingApproval cleared)
Gemini fresh mtime → working
Gemini stale (3h) → idle
Gemini waiting anywhere in tree → 0 (never claims waiting)
cleanup residue → 0
```

Fixture conventions per the round-428 method notes held:
Claude agent name `claude-code`; Codex rollout under
`~/.codex/sessions/YYYY/MM/DD/` with a `session_meta`
first line supplying the sessionId.

## Verdict

All three collectors judge status correctly on live-fire
fixtures; honest source-specific semantics intact. No
P0/P1; docs-only, no changeset.
