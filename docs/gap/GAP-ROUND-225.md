# GAP-ROUND-225 — 本地采集器实弹抽查（纯文档）

Round 225. Driver dimension: local collector live-fire spot check
(Claude / Codex / Gemini status derivation), first since round-212.

## Evidence (v0.4.8 dist collectors, real home-dir session files)

### Baseline

6 real local sessions (2 per collector), all correctly `idle`,
0 unknown statuses.

### Claude (transcript heuristic)

```text
unresolved tool_use          -> waiting/approve
tool_result observed         -> working
final assistant text message -> idle
```

### Codex (rollout lifecycle)

```text
task_started + exec_approval_request -> waiting/approve
  detail: "wants to run: rm -rf ./dist" (array command preview)
task_complete                        -> idle
```

Note (by design, matches the collector's documented lifecycle):
an `agent_message` alone does not resolve a pending approval —
only `task_started`/`task_complete` clear it.

### Gemini (mtime heuristic)

```text
fresh logs.json mtime -> working
3h-old mtime          -> idle
ever claims waiting?  -> false (honest boundary holds)
```

Cleanup: all probe session files removed; post-removal collect
shows 0 probe residue items.

## Verdict

All three collectors derive status exactly per contract. No
P0/P1; docs-only, no changeset.
