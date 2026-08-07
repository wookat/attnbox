# GAP-ROUND-96 — 移动端 PWA 离线快照实机复走（纯文档）

Round 96. Driver dimension: UX walkthrough — the round-45 offline
last-known-state path and PWA install surface had not been re-walked
since the round-79 localStorage-write rework and 3k scale.

## Walked through (390×844, live inbox ~2,907 sessions / 6 waiting)

- Manifest: served, `display=standalone`, 3 icons — installable.
- Service worker: registered on first load.
- Offline reload (network cut, then reload): the inbox renders the
  full last-known state — headline "6 agents are waiting on you",
  cards with detail previews and PR chips intact — with the header
  pill switching `live → offline`. No permanent skeleton screen
  (round-45's failure mode) and no stale-data masquerade: the offline
  pill labels it.
- Screenshot evidence archived (mobile viewport, offline state).

## Verdict

No P0/P1: offline snapshot behavior survived the round-79 write-path
rework at current scale. Docs-only; no changeset.
