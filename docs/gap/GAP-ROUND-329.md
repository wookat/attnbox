# GAP-ROUND-329 — 本地采集器实弹抽查（纯文档）

Round 329. Driver dimension: local collector live-fire spot
check — Claude Code / Codex / Gemini on-disk status
determination, first since round-316. Real fixture files under
`~/.claude/projects`, `~/.codex/sessions`, `~/.gemini/tmp`,
asserted through the real CLI (`ls --all --json` with 128 MB
maxBuffer), agent+stamp double filter.

## Evidence (v0.4.8)

```text
claude unresolved tool_use  → waiting / approve
claude resolved tool_use    → working
codex exec_approval_request → waiting / approve · detail carries
                              the pending command preview
codex task_complete         → idle
gemini fresh session        → working · never claims waiting
post-cleanup residue        → 0 stamped items (full re-list)
```

All three collectors judge correctly: Claude approve-waiting
heuristic round-trips on tool_use/tool_result; Codex approval
surfaces waiting/approve with the command in the detail and
clears to idle on task_complete; Gemini honestly stays within
working/idle and never claims waiting. All stamped fixtures
removed; zero residue on full re-list.

## Verdict

No P0/P1; docs-only, no changeset.
