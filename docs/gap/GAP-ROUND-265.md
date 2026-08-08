# GAP-ROUND-265 — 本地采集器实弹抽查（纯文档）

Round 265. Driver dimension: local collector live-fire spot
check — Claude / Codex / Gemini on-box status decisions, first
since round-253. Assertions matched on agent + unique stamp per
the round-253 method note.

## Evidence (v0.4.8, real transcript/session files, live org
@3,391 sessions)

### Claude Code (transcript heuristic)

```text
unresolved tool_use          → waiting/approve
after tool_result            → working
assistant text (stale mtime) → idle
```

### Codex CLI (rollout events)

```text
exec_approval_request        → waiting/approve
                               [wants to run: rm -rf ./dist]
after task_complete (stale)  → idle
```

### Gemini CLI (mtime heuristic)

```text
fresh mtime → working · stale mtime → idle
ever claims waiting? false
```

All three collectors decide correctly; Codex approval carries
the command preview; Gemini never claims waiting per contract.
Probe files removed, zero residue in the final collect.

Method note: `ls --all --json` at 3.4k sessions overflows the
default execSync buffer (ENOBUFS) — probes must pass a large
`maxBuffer` (e.g. 128 MB) when shelling out to the full-list CLI.

## Verdict

No P0/P1; docs-only, no changeset.
