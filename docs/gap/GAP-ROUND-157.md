# GAP-ROUND-157 — 浏览器通知路径复走（纯文档）

Round 157. Driver dimension: real testing — browser notification path
re-walked on the live org (first since rounds 81/121 storm-guard
work; first live-transition observation since round-23's actionable
notifications).

## Evidence (real browser via CDP, v0.4.8, ~3,094 sessions)

- Bell toggle honours granted permission + `attnbox:notify` = on
  (`aria-pressed=true` on load).
- Live watch: two real sessions transitioned to waiting during the
  observation window; both fired exactly one notification each via
  the service-worker path with:
  - title `devin: has a question`;
  - body = session title + question preview (`detail`);
  - `tag` = item id (dedup key), `actions: [✓ Done]`.
- 0 duplicate tags across the watch — round-81's storm guard
  (seen-set keyed on observed non-waiting) holds on live churn.
- `✓ Done` action's ack POST (as `sw.js` `notificationclick` issues
  it) round-trips: ledger 0→1→0 after un-ack, no residue.

## Verdict

Notification path fully healthy on live data. No P0/P1; docs-only,
no changeset.
