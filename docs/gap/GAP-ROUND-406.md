# GAP-ROUND-406 — 本地采集器实弹抽查（纯文档）

Round 406. Driver dimension: local collector live-fire spot
check (Claude / Codex / Gemini status determination), first
since round-395. Synthetic stamped session files in the real
collector directories, agent+stamp double-filtered, full CLI
reads via `ls --all --json` (large maxBuffer).

## Evidence (v0.4.8)

```text
claude-code: unresolved tool_use → waiting/approve ·
             tool_result appended → working (fresh
             activity; waiting cleared — round trip ✓)
codex:       exec_approval_request → waiting/approve with
             command preview "wants to run: rm -rf /tmp/x" ·
             task_complete → idle  (round trip ✓)
gemini:      fresh session mtime → working only · stale →
             idle · never claims waiting  (honest boundary ✓)
cleanup:     all stamped files removed · residue 0
```

Note: the Claude post-resolution reading is `working` (not
`idle`) because the probe's tool_result write refreshes the
transcript mtime within the 5-minute stale-working cap; the
contract under test — waiting/approve cleared once the
tool_use is resolved — holds.

## Verdict

All three collectors correct at every probed boundary. No
P0/P1; docs-only, no changeset.
