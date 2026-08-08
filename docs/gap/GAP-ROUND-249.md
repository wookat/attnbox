# GAP-ROUND-249 — 浏览器通知路径复走（纯文档）

Round 249. Driver dimension: real testing — browser notification
path (new-waiting notification + actionable ✓ Done + storm
guard), first since round-221.

## Evidence (v0.4.8, live daemon @3,331 sessions, real Chrome)

Precondition check per the round-221 method note: first
observation window read 0 because `Notification.permission` was
`default` and bell `aria-pressed=false` — window discarded, not
trusted. Permission granted, bell enabled
(`aria-pressed=true`), then a fresh 5-minute window:

```text
stock at open: 12 waiting → 0 startup notifications (storm guard)
5-minute window: 4 SW notifications · 4 distinct devin IDs
each: title "devin: has a question" · body carries the actual
  question preview · exactly one ✓ Done action
duplicates: 0
all 4 IDs confirmed as real waiting sessions in /api/items
```

Rounds 71/81 storm-guard and round-23 actionable-notification
contracts all hold. Bell state restored, probe daemon killed via
listener PID, port 4935 verified clear, temp scripts and log
removed.

## Verdict

No P0/P1; docs-only, no changeset.
