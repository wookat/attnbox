# GAP-ROUND-252 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 252. Driver dimension: real testing — PWA offline
last-known snapshot + SSE disconnect/reconnect resilience, first
since round-241.

## Evidence (v0.4.8, live daemon @~3,345 sessions, real Chrome)

```text
live view: 102 active cards · offline indicator: false
after daemon kill: cards 102 retained · offline indicator: true
cold open while down: 102 cards from snapshot · offline: true
after daemon restart: same never-refreshed page back live —
  offline indicator cleared, cards live-updated (100)
```

Rounds 45/79/108/125 contracts hold: kill keeps the last-known
list with an honest offline indicator, a cold open during the
outage restores the full snapshot, and the original page
auto-reconnects without a refresh once the daemon returns.
Method note: the probe's in-script daemon restart via
`execSync("setsid nohup ... &")` hangs the Node probe (execSync
holds the pipe); restart the daemon from a separate shell and
verify the still-open page from a second probe instead. Probe
daemon killed via listener PID, port 4933 verified clear, temp
scripts and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
