# GAP-ROUND-114 — 文档新鲜度走查：detail 取全边界入档（纯文档）

Round 114. Driver dimension: docs freshness — README/LIMITS/site
checked against rounds 106–113 evidence.

## Found

One drift: the round-111 behavior change (waiting question previews
now fetched for *every* blocked session in one bounded pass, instead
of 10 per cycle) was verified on three surfaces but documented
nowhere. Added one sentence to `docs/LIMITS.md` and the site limits
page (Devin bullet).

Everything else clean: the old 10-per-cycle cap was never publicly
documented (only in GAP-ROUND-20), so no stale claims to retract;
README, doctor/inbox/quickstart pages carry no version-specific or
now-false statements.

## Verdict

No P0/P1. Site rebuild verified locally; deploy after merge.
Docs-only; no changeset.
