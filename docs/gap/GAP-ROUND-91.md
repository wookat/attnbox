# GAP-ROUND-91 — 文档新鲜度走查：官网 limits 页同步 round-88 云状态边界（纯文档）

Round 91. Driver dimension: docs freshness after rounds 85–90.

## Checked

- README quickstart, feature list, webhook/notification wording — no
  drift (round-86 ls age is a detail-level change, README's `ls`
  mention is generic and stays accurate).
- Site pages (index/quickstart/inbox/doctor/hooks/limits) against
  rounds 85–90 changes: only one drift — the limits page still stated
  the 5-minute stale-`working` cap unconditionally, but round-88
  documented in repo LIMITS that the cap is local-heuristic-only and
  cloud statuses are vendor-authoritative pass-through.
- Repo `docs/LIMITS.md` — current (round-88 line present).

## Change

One sentence on the site limits page: staleness cap scoped to local
collectors + cloud pass-through explanation, mirroring
`docs/LIMITS.md`.

## Verdict

No P0/P1. Docs-only; no changeset. Site rebuild/deploy after merge.
