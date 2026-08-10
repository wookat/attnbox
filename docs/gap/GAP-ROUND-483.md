# GAP-ROUND-483 — 本地采集器实弹抽查（纯文档）

Round 483. Driver dimension: local collector
live-fire fixture spot check (Claude / Codex /
Gemini status determination), first since
round-472. Probes run against v0.4.8 collectors
dist classes with isolated temp home dirs.

## Evidence

```text
claude pending tool_use   → waiting/approve
claude after tool_result  → working (waiting
                            cleared)
codex approval pending    → waiting/approve,
                            detail "wants to run:
                            rm -rf build"
codex after task_complete → idle
gemini fresh mtime        → working
gemini ever waiting       → false (honest
                            working/idle only)
```

方法注记复核成立：Codex rollout 须落
`sessions/YYYY/MM/DD/` 且带 `session_meta`；
Gemini ID 为 `gemini:<directory-name>`；采集器构造
参数为目录路径（`ClaudeCollector(projectsDir,
hooksDir)` 等），非 options 对象。Claude fixture
detail 为空属预期（detail 取最后一条 assistant
文本，fixture 只有 tool_use 无文本）。

Cleanup: temp home dir removed, probe script
deleted, zero residue.

## Verdict

All three collectors' status determination correct
per contract. No P0/P1; docs-only, no changeset.
