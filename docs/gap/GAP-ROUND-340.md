# GAP-ROUND-340 — 本地采集器实弹抽查（纯文档）

Round 340. Driver dimension: local collector live-fire spot check —
Claude Code / Codex / Gemini on-box status determination via
timestamped fixtures against the real installed CLI (`ls --all
--json`, 128 MiB maxBuffer), first since round-329.

## Evidence (v0.4.8, live org data alongside ~3,6xx sessions)

```text
claude unresolved tool_use  → waiting
claude after tool_result    → idle
codex exec_approval_request → waiting · attention: approve
                              detail: "wants to run: rm -rf /tmp/x-<stamp>"
codex after task_complete   → idle
gemini fresh mtime          → working · never claims waiting ✓
cleanup                     → full re-list residue: 0 (both stamps)
```

All assertions used agent+stamp double filtering. Attention/detail
are top-level item fields (`item.attention`, `item.detail`), not a
nested `attention.type` — first probe pass asserted the wrong path
and was re-verified with a second stamped Codex fixture before
recording.

## Verdict

All three local collectors correct: Claude tool_use roundtrip,
Codex approval with command preview → idle, Gemini honest
working/idle-only boundary. Zero residue. No P0/P1; docs-only,
no changeset.
