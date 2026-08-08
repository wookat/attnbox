# GAP-ROUND-221 — 浏览器通知路径复走（纯文档）

Round 221. Driver dimension: real testing — browser notification
path (new-waiting notification + ✓ Done action + storm guard),
first since round-187.

## Evidence (v0.4.8, live daemon @~3,250 sessions, real Chrome,
SW `showNotification` instrumented)

### Positive path (8-minute window, notifications ON)

5 brand-new waiting transitions observed (verified by waiting-id
diff against `/api/items` each minute) → **exactly 5 notifications,
0 duplicates**, each with:

- title `devin: has a question`;
- body = item title + "what is it asking" detail preview;
- **✓ Done action present** on every one (`actions: [ack]`).

Items that merely *left* waiting produced no notification, and
oscillating counts never re-notified an already-seen id.

### Storm guard

Fresh page load against 6 stock waiting items: **0 notifications**
(first payload primes the seen-set without notifying — round-81
contract holds).

### Method note

`attnbox:notify` localStorage was left `off` by an earlier probe,
which silently disables the whole path while `Notification.permission`
is still `granted` — two initial observation windows read 0 notifs
for that reason. Future notification probes must assert the bell's
`aria-pressed=true` (or `attnbox:notify` ≠ `off`) before trusting a
zero reading. State restored to `off` after the run; probe daemon
killed, port clear, temp scripts removed.

## Verdict

Notification contract fully holds on live transitions. No P0/P1;
docs-only, no changeset.
