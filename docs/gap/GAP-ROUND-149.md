# GAP-ROUND-149 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 149. Driver dimension: real testing — offline last-known
snapshot and SSE disconnect/reconnect recovery re-walked (first since
rounds 96/108), on the v0.4.8 slim build against a live ~3,070-session
org.

## Evidence (real browser via CDP)

- Online baseline: 85–88 active cards, `live` badge, 1 service worker
  registered.
- Daemon killed with the tab open: `offline` badge + amber "daemon
  lost — showing the last known state, reconnecting…" banner appear,
  card list preserved.
- Offline cold open (daemon down, fresh page): SW-cached shell +
  cached **slim** snapshot render 88 active cards with the `offline`
  badge and banner — matches the round-125 boundary (active sessions
  only offline; Done/finished search need the daemon).
- Daemon restarted: page returns to `live` and the banner clears
  without a manual refresh.
- One earlier false reading traced to a stray second daemon on the
  same port from a prior probe — re-verified with a single daemon;
  contract holds.

## Verdict

Offline snapshot and SSE resilience contracts fully hold on v0.4.8.
No P0/P1; docs-only, no changeset.
