# GAP-ROUND-417 — 本地采集器实弹抽查（纯文档）

Round 417. Driver dimension: local collector live-fire spot
check (Claude / Codex / Gemini state adjudication), first
since round-406. Stamped fixtures in a throwaway sandbox
HOME driven straight through the built collectors
(`attnbox-collectors` dist), agent+stamp double filter.

## Evidence (v0.4.8 / collectors 0.2.7)

```text
claude-code: unresolved tool_use → waiting/approve ·
             tool_result appended → working (5-min fresh
             window contract)
codex:       exec_approval_request → waiting/approve with
             command preview "wants to run: rm -rf /tmp/x417"
             · task_complete → idle
gemini:      fresh session mtime → working only · stale →
             idle · never claims waiting
cleanup:     sandbox HOME removed · residue 0
```

Probe note: Gemini item IDs are `gemini:<dir>` with no
transcript text, so the stamp filter must match on the
sandbox directory name (or exact id), not message content —
first pass read "NONE" for that reason; corrected probe
shows the honest working/idle boundary above.

## Verdict

All three collectors adjudicate correctly. No P0/P1;
docs-only, no changeset.
