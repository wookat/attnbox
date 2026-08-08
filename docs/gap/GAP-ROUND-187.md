# GAP-ROUND-187 — 浏览器通知路径复走（纯文档）

Round 187. Driver dimension: real-world testing — browser
notification path re-walked live (first since round-157): permission
grant → new-waiting notifications → actionable ✓ Done button →
storm guard under real churn.

## Evidence (v0.4.8, live org ~3,166 sessions, 4-minute window)

- Notification permission granted for the inbox origin; SW active.
- **6 real waiting transitions → exactly 6 SW notifications** —
  each with the `agent: has a question` title, the actual question
  preview in the body, `tag` = item id, and the **✓ Done** action
  button present.
- **0 duplicates**: every notification carried a distinct item tag;
  no re-fires for existing waiting stock across the whole window
  (rounds 71/81 storm-guard contract holds under live churn).
- Probe daemon torn down; port verified clear; temp script removed.

## Verdict

Notification path contract fully holds on real transitions. No
P0/P1; docs-only, no changeset.
