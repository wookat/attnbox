# GAP-ROUND-291 — 本地采集器实弹抽查（纯文档）

Round 291. Driver dimension: local collector live-fire —
Claude/Codex/Gemini on-machine status derivation, first since
round-279.

## Evidence (v0.4.8, real home-dir session files, stamped probe)

```text
claude tool_use:        waiting/approve
claude after user msg:  working
claude assistant text:  idle
codex approval req:     waiting/approve · "wants to run: rm -rf build"
codex task_complete:    idle
gemini fresh mtime:     working (attention: none)
gemini stale mtime:     idle   (attention: none)
residue after cleanup:  0
```

All three collectors judge correctly against real session files:
Claude round-trips tool_use→waiting/approve, user
reply→working, plain assistant text→idle; Codex surfaces an
approval request as waiting/approve with the command preview and
clears to idle on task_complete; Gemini's mtime heuristic only
ever claims working/idle and never waiting (honest boundary).
Assertions used agent+stamp double filtering; the full-CLI probe
passed 128 MB `maxBuffer` per the round-265 note. Post-cleanup
full re-scan found zero stamped residue in `~/.claude/projects`,
`~/.codex/sessions`, and `~/.gemini/tmp`.

## Verdict

No P0/P1; docs-only, no changeset.
