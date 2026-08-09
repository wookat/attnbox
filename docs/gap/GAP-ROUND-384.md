# GAP-ROUND-384 — 本地采集器实弹抽查（纯文档）

Round 384. Driver dimension: local collector live-fire spot
check (Claude / Codex / Gemini state determination), first
since round-373. Stamped synthetic sessions against the real
collector implementations; agent+stamp double filtering.

## Evidence (v0.4.8, collectors 0.2.7)

Phase 1 — active signals:

```text
claude-code · waiting · attention: approve · detail: "I want to edit the file"
codex       · waiting · attention: approve · detail: wants to run: rm -rf build
gemini      · working                        (fresh mtime — never claims waiting)
```

Phase 2 — resolution (tool result / task_complete written, all
files aged 40 minutes):

```text
claude-code · idle
codex       · idle
gemini      · idle
```

Cleanup:

```text
residue: 0
```

## Verdict

All three collectors judge state correctly: Claude unresolved
`tool_use` → waiting/approve and resolves to idle; Codex
`exec_approval_request` → waiting/approve with command detail
and resolves after `task_complete`; Gemini honestly reports
only working/idle. No P0/P1; docs-only, no changeset.
