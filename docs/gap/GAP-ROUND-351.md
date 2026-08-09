# GAP-ROUND-351 — 本地采集器实弹抽查（纯文档）

Round 351. Driver dimension: local collector live-fire spot
check (Claude Code / Codex / Gemini on-box state
determination), first since round-340. Stamped fixtures
(`r351-<epoch>`), agent+stamp double filter, explicit cleanup.

## Evidence (v0.4.8, `ls --all --json`)

Phase 1 — waiting fixtures:

```text
claude-code · waiting · attention: approve   (unresolved tool_use)
codex       · waiting · attention: approve · detail: wants to run: rm -rf /tmp/x-r351-…
gemini      · working                        (fresh mtime — never claims waiting)
```

Phase 2 — resolution fixtures (tool_result + task_complete;
Gemini mtime aged 30 min):

```text
claude-code · idle
codex       · idle
gemini      · idle
```

Phase 3 — cleanup: fixtures removed, re-list residue count 0.

## Verdict

All three collectors correct on both transitions; Gemini honest
boundary holds (working/idle only, never waiting). No P0/P1;
docs-only, no changeset.
