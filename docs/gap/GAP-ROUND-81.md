# GAP-ROUND-81 — 浏览器通知抖动风暴：round-71 同类缺陷在 web 通知路径复现（P1）

Round 81. Driver dimension: negative-path audit — round-71 fixed the
webhook flap storm in the daemon; this round audited the *other*
"newly waiting" consumer, the browser-notification path in the web UI.

## Found (P1)

`seenWaiting` was replaced wholesale on every snapshot
(`seenWaiting.current = waitingIds`). A collector outage (fail-soft
returns no items) empties the set; the recovery snapshot then
re-notifies **every** waiting item — at current scale, up to ~30
duplicate notifications per blip, on every open tab/PWA. Exactly the
failure class round-71 fixed for webhooks.

Secondary: on a tab with no cached snapshot, the baseline was
initialized before the first snapshot arrived, so pre-existing waiting
items notified on startup.

## Fix

Same semantics as the daemon's webhook guard:

- an id leaves the seen set only when observed non-waiting; absence
  (outage) keeps it,
- the baseline initializes from the first *loaded* state (cached or
  live), so startup items never notify,
- genuine waiting → done → waiting still notifies.

## Verification (programmatic, real built bundle)

Playwright against a scripted mock SSE daemon, FakeNotification
recording calls; six-snapshot scenario (startup / new item / outage /
recovery / done / re-waiting) produced cumulative notification counts
`[0,1,1,1,1,2]` — startup 0, outage-recovery 0 duplicates, real
transitions 1 each.

94 tests green. attnbox patch changeset (now 2 pending with round-79).
