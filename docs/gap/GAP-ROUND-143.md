# GAP-ROUND-143 — 文档新鲜度走查（纯文档）

Round 143. Driver dimension: documentation freshness — README, site
docs, LIMITS, MATURITY audited against rounds 137–142 evidence (first
since round-136).

## Findings

- `docs/LIMITS.md`: no drift — the Escape stale-waiting paragraph
  already records ccmux's capture-pane retirement (kept current in
  round-138's sweep); slim SSE, crawl, webhook and token-gate wording
  all match round-141/142 re-verified behavior.
- Site (`apps/site` limits/inbox/doctor/quickstart): no drift — the
  limits page carries the v0.4.8 slim boundary and points to the
  canonical LIMITS table.
- `README.md`: no drift.
- `docs/MATURITY.md`: one stale row — "Real-world validation" still
  cited the round-93 probe and a 2,900-session org. Refreshed to the
  round-137 reply re-probe, rounds 99/132 installer negatives,
  rounds 121/141 storm-guard regressions, and the 3,000-session
  scale.

## Verdict

Single stale evidence row refreshed; everything else current. No
P0/P1; docs-only, no changeset. No site rebuild needed (site content
unchanged).
