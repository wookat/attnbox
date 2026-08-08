# GAP-ROUND-242 — 本地采集器实弹抽查（纯文档）

Round 242. Driver dimension: local collectors live-fire —
Claude / Codex / Gemini on-box state determination, first since
round-225.

## Evidence (v0.4.8, real session files, isolated probe IDs)

```text
baseline counts: 6 sessions {"idle": 6} — all correct
claude unresolved tool_use:   r242-session → waiting/approve
claude after tool_result:     r242-session → working
claude after assistant text:  r242-session → idle
codex approval request:       r242x → waiting/approve
                              [wants to run: rm -rf ./dist]
codex after task_complete:    r242x → idle
gemini fresh logs.json mtime: r242hash → working
gemini stale mtime:           r242hash → idle
gemini ever waiting?          false
residue probe items:          0
```

All three collectors correct: Claude heuristic three-state
round-trip, Codex approval surfaces waiting/approve with command
preview then clears on task_complete, Gemini honestly never
claims waiting (working/idle mtime heuristic only). Probe files
removed, zero residue.

## Verdict

No P0/P1; docs-only, no changeset.
