# GAP-ROUND-253 — 本地采集器实弹抽查（纯文档）

Round 253. Driver dimension: local collectors live-fire —
Claude / Codex / Gemini on-machine status determination, first
since round-242.

## Evidence (v0.4.8, controlled probe sessions in real
`~/.claude` / `~/.codex` / `~/.gemini` layouts)

```text
baseline counts: 6 {"idle":6}
claude unresolved tool_use: waiting/approve
claude after tool_result: working
claude after assistant text: idle
codex approval request: waiting/approve [wants to run: rm -rf ./dist]
codex after task_complete: idle
gemini fresh logs.json mtime: working
gemini stale mtime: idle
gemini ever waiting? false
residue probe items: 0 · final counts: {"idle":6}
```

All three collectors judge correctly: Claude three-state
round-trip, Codex approval surfaces with the command preview and
clears on `task_complete`, Gemini's mtime heuristic never claims
waiting. Probe method note: assertions must filter by `agent` as
well as the probe stamp — Claude and Codex probe items share the
stamp in their ids, and a bare `id.includes(stamp)` find can
match the other agent's (already-idle) item and misread the
state. Probe files removed, zero residue.

## Verdict

No P0/P1; docs-only, no changeset.
