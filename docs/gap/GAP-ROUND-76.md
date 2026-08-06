# GAP-ROUND-76 — 官网 doctor 页跟上 round-75 webhook 检查（纯文档）

Round 76. Driver dimension: docs freshness after rounds 74–75.

## Drift found and fixed

- Site doctor page: sample output and "what it actually checks" now
  include the `webhook` line — the only surface where a typo'd
  fire-and-forget `ATTNBOX_WEBHOOK_URL` becomes visible.

## Checked, no drift

- `ls` output details aren't itemized on the site (quickstart shows
  the command only), so round-74's action-URL lines need no site
  change; `--help` and the CHANGELOG carry them.
- inbox/limits/hooks/quickstart pages: no drift from rounds 74–75.

No package change; no changeset. Site redeploy after merge.
