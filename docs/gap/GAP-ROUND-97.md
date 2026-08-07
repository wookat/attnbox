# GAP-ROUND-97 — dogfood 数据健康度复查（纯文档）

Round 97. Driver dimension: data analysis on the live inbox
(2,909 sessions).

## Findings

- Status distribution: 6 waiting / 41 working / 6 idle / 2,856 done /
  0 unknown — no phantom states.
- Waiting quality: 6/6 with `detail` (the actual question) and `url`
  (session deep link); 4/6 with `prUrl`. Ages 6–25 min — all fresh,
  no stale-waiting noise (round-72 boundary not triggered).
- Ack store: 15 entries, all resolvable — no orphan growth.
- Project grouping coverage: 1,207/2,903 Devin sessions (41.6%)
  without a project. Checked the vendor payload again: still no repo
  field beyond `pull_request.url`, so coverage is bounded by how many
  sessions open PRs. Ratio unchanged vs round-88 (41.5%) — stable,
  and concentrated in `done` sessions where grouping has no triage
  value. Remains a P2; trigger stays "vendor adds a repo field or
  waiting items start missing projects".

## Verdict

No P0/P1. Docs-only; no changeset.
