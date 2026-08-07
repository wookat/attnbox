# GAP-ROUND-113 — web 收件箱 waiting 详情覆盖走查（纯文档）

Round 113. Driver dimension: UX walkthrough — the round-111 fix was
verified for `ls` (release loop) and the daemon API (round-112); this
round closes the loop on the web inbox surface.

## Evidence

Live inbox (main @ v0.4.6, ~2,940 sessions) via Playwright:

- "Needs you" tab: 17/17 visible waiting cards render the question
  preview under the title (previously up to half would have shipped
  without it at >10 blocked).
- Full view spot-check: waiting card sample shows attention label
  ("has a question"), agent/cloud badges, age, and detail text — all
  triage signals present on one card.

## Verdict

No P0/P1. The detail-truncation fix is now verified on all three
surfaces (one-shot CLI, daemon API, web UI). Docs-only; no changeset.
