# GAP-ROUND-395 — 本地采集器实弹抽查（纯文档）

Round 395. Driver dimension: local collector live-fire spot
check (Claude / Codex / Gemini status determination), first
since round-384. Synthetic stamped session files in the real
collector directories, agent+stamp double-filtered.

## Evidence (v0.4.8)

```text
claude-code: unresolved tool_use → waiting/approve ·
             tool_result appended → idle  (round trip ✓)
codex:       exec_approval_request → waiting/approve with
             command preview "wants to run: rm -rf /tmp/x" ·
             task_started/task_complete → idle  (round trip ✓)
gemini:      fresh session mtime → working only · stale →
             idle · never claims waiting  (honest boundary ✓)
cleanup:     all stamped files removed · residue 0
```

Method note: Codex `pendingApproval` clears only on
`task_started`/`task_complete` — an `exec_command_begin`
event alone does NOT resolve waiting (by design: approval is
resolved when the task actually starts/finishes). A first
resolution attempt using only `exec_command_begin` read
`waiting` correctly per that contract and was superseded by
the proper task-event probe.

## Verdict

All three collectors correct at every probed boundary. No
P0/P1; docs-only, no changeset.
