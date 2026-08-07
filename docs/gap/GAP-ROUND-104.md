# GAP-ROUND-104 — 本地采集器真实数据抽查（纯文档）

Round 104. Driver dimension: data/real testing on the **local** side —
recent rounds all exercised the cloud path; the transcript heuristics
had not been spot-checked against live files since round-92.

## Probed (real `~/.claude` / `~/.codex` / `~/.gemini`)

- Steady state: all 6 local sessions (2 per agent) report `idle` —
  correct, every transcript's last activity is days old (stale cap
  and lifecycle parsing agree).
- **Waiting/approve heuristic live-fire**: injected a fresh transcript
  with an unresolved `tool_use` tail into `~/.claude/projects/` →
  `attnbox ls --waiting` immediately surfaced
  `● waiting claude-code local [approve] run the migration (3s)` —
  correct status, attention verb, title, and age. Removed after.
- `scripts/heuristic-audit.mjs` runs clean but reports 0 hook-tracked
  sessions on this box — accuracy quantification remains the known
  LIMITS gap (needs real hook-installed agent usage, unchanged P2).

## Verdict

No P0/P1: local idle classification and the approve-waiting heuristic
both behave per contract on real files. Docs-only; no changeset.
