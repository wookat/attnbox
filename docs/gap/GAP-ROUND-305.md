# GAP-ROUND-305 — 本地采集器实弹抽查（纯文档）

Round 305. Driver dimension: local collector live-fire —
Claude / Codex / Gemini on-machine state judgement with real
stamped session files, first since round-291.

## Evidence (v0.4.8, real CLI `ls --all --json` with 128 MB
maxBuffer, stamped probe sessions, agent+stamp double filter)

```text
claude tool_use:        waiting/approve
claude after user msg:  working
claude assistant text:  idle
codex approval req:     waiting/approve · "wants to run a command"
codex task_complete:    idle
gemini fresh mtime:     working (attention: none)
gemini stale mtime:     idle   (attention: none)
residue after cleanup:  0
```

All three collectors judge correctly on live files: Claude's
transcript heuristic round-trips waiting/approve → working →
idle; Codex's authoritative hooks surface an approval request
as waiting/approve with a command detail and clear on
task_complete; Gemini's mtime heuristic reports only
working/idle and never claims waiting (honest-boundary contract
holds). Full post-cleanup sweep found zero probe residue.

## Verdict

No P0/P1; docs-only, no changeset.
