# GAP-ROUND-212 — 本地采集器实弹抽查（纯文档）

Round 212. Driver dimension: local collectors live-fire spot check —
Claude / Codex / Gemini on-machine status derivation (first since
round-199).

## Evidence (v0.4.8 collectors dist, real home dirs, controlled
probe files)

Baseline: 6 real local sessions (2 claude / 2 codex / 2 gemini),
all correctly `idle`.

### Claude (transcript heuristic)

```text
unresolved tool_use            -> waiting/approve
matching tool_result appended  -> working
probe dir removed              -> gone (baseline restored)
```

### Codex (rollout parsing; approval command is metadata only,
never executed)

```text
exec_approval_request -> waiting/approve [wants to run: bash -lc ls /tmp/r212-prob…]
task_complete         -> idle
```

Exact command preview surfaces in `detail`.

### Gemini (mtime heuristic, never claims waiting)

```text
fresh logs.json mtime -> working
probe dir removed     -> gone
```

No waiting/attention ever claimed for gemini — honesty contract
holds.

Post-run residue check across all three agent home dirs: clean.

## Verdict

All three collectors derive states exactly per contract at current
scale. No P0/P1; docs-only, no changeset.
