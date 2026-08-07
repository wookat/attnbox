# GAP-ROUND-105 — 官网文档新鲜度走查（纯文档）

Round 105. Driver dimension: docs freshness — site pages re-checked
against everything shipped/verified in rounds 95–104.

## Checked

- doctor page: wording already endpoint-agnostic, so round-94's probe
  change needs no edit; sample output current.
- limits page: stale-cap scoping, full-crawl bound, cloud
  pass-through, review-requested coverage — all current.
- quickstart/index: current.
- **One gap found**: the offline last-known-snapshot behavior
  (shipped round-45, re-verified live in round-96) was never
  documented on the site — the "From your phone" flow is exactly
  where users hit it (tunnel down, laptop asleep). Added one
  paragraph to inbox.md describing the snapshot render and the
  `live → offline` pill.

## Verdict

No P0/P1; single additive drift fix. Site rebuild after merge.
No changeset (site only).
