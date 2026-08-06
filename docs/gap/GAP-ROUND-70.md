# GAP-ROUND-70 — v0.4.0 对外叙事补齐（README/官网首页，纯文档）

Round 70. Driver dimension: docs freshness after the v0.4.0 release
(rounds 67/69 shipped).

## Drift found and fixed

The webhook is the first "works with the inbox closed" channel and the
first public extension point — but the two highest-traffic surfaces
didn't mention it:

- `README.md` feature list: added the bring-your-own-channel bullet
  (`ATTNBOX_WEBHOOK_URL`, ntfy/Slack relay, no push server).
- Site landing page card: PWA card now points at the webhook for
  inbox-closed alerts.

Deep docs were already in place from round 69 (inbox page section +
LIMITS honest boundaries), so this is drift on the marketing surfaces
only.

## Checked, no drift

- quickstart/doctor/hooks pages: webhook is optional and off-topic
  there; no change needed.
- `p` shortcut already documented (round-67 keyboard table + help
  panel).

## Release regression (v0.4.0)

Clean-env `npm install attnbox@0.4.0`: daemon 0.3.0 resolved, web 200,
1,006 sessions / 26 waiting, `--help` documents the webhook, 26
pre-existing waiting items fired 0 startup posts (correct semantics).
Release: https://github.com/wookat/attnbox/releases/tag/v0.4.0

No package behavior change; no changeset. Site redeploy after merge.
