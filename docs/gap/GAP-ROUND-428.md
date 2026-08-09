# GAP-ROUND-428 — 本地采集器实弹抽查（纯文档）

Round 428. Driver dimension: local collector live-fire spot
check (Claude / Codex / Gemini state derivation), first
since round-417. Stamped fixtures written into the real
`~/.claude` / `~/.codex` / `~/.gemini` trees, asserted via
`ls --all --json` (agent + exact-stamp filter, 256MB
maxBuffer), then removed.

## Evidence (v0.4.8)

```text
Claude  unresolved tool_use        → waiting/approve
Claude  matching tool_result       → working (fresh window,
                                     per round-406 contract)
Codex   exec_approval_request      → waiting/approve
                                     detail="wants to run:
                                     bash -c npm publish"
Codex   task_complete              → idle (waiting cleared)
Gemini  fresh mtime                → working, no attention
Gemini  stale mtime (3h)           → idle, no attention
Gemini  waiting count across tree  → 0 (honest boundary)
cleanup residue                    → 0
```

Probe notes (methodology, no product issue):
- Claude items are `agent: "claude-code"` — probe filters
  must not use the bare string `claude`.
- Codex rollout must live under the dated
  `sessions/YYYY/MM/DD/` subtree and must carry a
  `session_meta` entry (no `session_meta` → no `sessionId`
  → rollout skipped by design).

## Verdict

All three collectors derive states correctly on live
fixtures. No P0/P1; docs-only, no changeset.
