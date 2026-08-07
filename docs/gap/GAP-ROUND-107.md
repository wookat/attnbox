# GAP-ROUND-107 — 分诊全流程实机复走（纯文档）

Round 107. Driver dimension: UX walkthrough — search → filter →
ack-all → un-ack, end to end on the live inbox (~2,940 sessions,
waiting count moving 14→19 during the walk as the org worked).

## Walked through

- Search: "Suinian" narrowed the full list to 46 matching cards
  (title/detail matching), clearing restored the view.
- Needs-you tab: exact match with the headline count.
- **✓ all done**: acked every waiting item in one click; headline
  correctly flipped to "No one is waiting on you 🎉" and the browser
  tab badge cleared.
- **Un-ack round trip**: acked items stay visible dimmed with a
  "Mark as unhandled" control (on their normal tabs — an earlier
  probe looked for them on Done, which is sessions-ended only, and
  wrongly reported the control missing; test-script error, same class
  as round-89). Clicking it restored the item to the headline count.
- State restore: all probe acks cleared through the `{at:null}` API
  contract; store back to 0 acked.

## Verdict

No P0/P1: the whole triage loop (find → focus → clear → undo) behaves
per contract at live scale. Docs-only; no changeset.
