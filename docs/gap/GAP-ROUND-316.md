# GAP-ROUND-316 — 本地采集器实弹抽查（纯文档）

Round 316. Driver dimension: local collector live-fire spot
check — Claude Code / Codex / Gemini on-disk state judgement,
first since round-305. Stamped probe sessions written to the
real collector directories, asserted through the real CLI
(`ls --all --json`, 128 MB maxBuffer per the round-265 note),
agent+stamp double-filtered per the round-253 note.

## Evidence (v0.4.8)

```text
claude unresolved tool_use → waiting / approve   (contract holds)
claude resolved tool_use   → working             (contract holds)
codex exec_approval_request → waiting / approve · detail carries
                              the pending command preview
codex task_complete        → idle                (approval cleared)
gemini fresh session       → working · never claims waiting
post-cleanup residue       → 0 stamped items
```

All three collectors judge state correctly: Claude transcript
heuristics round-trip waiting↔working; Codex approval requests
surface as waiting/approve with the command in the detail and
are cleared by task_complete; Gemini stays honest to its
mtime-only working/idle boundary. Probe files removed, zero
residue on a full re-list.

## Verdict

No P0/P1; docs-only, no changeset.
