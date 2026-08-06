# GAP-ROUND-75 — doctor 补 webhook 通道检查（可发现性 + 静默失败防护）

Round 75. Driver dimension: UX walkthrough of the setup/diagnostic
flow after the v0.4.x webhook shipped.

## Found

`attnbox doctor` is the discovery surface ("which collectors are
active and how to upgrade"), but it said nothing about the webhook:

- users don't learn the inbox-closed channel exists;
- worse, a typo'd `ATTNBOX_WEBHOOK_URL` fails **silently by design**
  (fire-and-forget) — doctor was the natural place to catch it, and
  didn't.

## Fix

New `webhook` check:

```
– webhook   ATTNBOX_WEBHOOK_URL not set — no push channel while the inbox is closed
✓ webhook   newly-waiting items POST to https://ntfy.sh/my-topic
! webhook   ATTNBOX_WEBHOOK_URL is not a valid URL — webhook posts will all fail
```

The ok-line shows origin+path only (template query params are noise;
tokens sometimes live in queries). No live probe — POSTing a fake
event to a real channel would page the user.

## Dogfood health

1,006 sessions; waiting 12, all 12 with detail, 3 with PR secondary
links; statuses waiting 12 / working 34 / idle 6 / done 954.

93 tests green. attnbox patch changeset (now 2 pending: rounds 74/75).
