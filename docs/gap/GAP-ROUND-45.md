# GAP-ROUND-45 — 离线/重开时显示最后已知状态（不再是永久骨架屏）

Round 45. Driver dimensions: real testing (offline PWA), UX walkthrough.

## Evidence sweep

Programmatic offline test (Playwright `setOffline` + reload) against the
live inbox:

- app shell loads offline (the round-4 service worker caches `attnbox-v1`) —
  good;
- but the freshly opened tab sat on the **"Checking your agents…" skeleton
  forever**: the round-9 "showing the last known state, reconnecting…"
  banner only held within an already-connected tab, so a PWA relaunch on a
  phone away from the daemon showed nothing actionable, breaking the
  banner's own promise.

## Gap (P1)

Mobile PWA is a first-class flow (round-29 `--host`). Reopening the
installed app without connectivity — the most common phone scenario —
rendered an empty skeleton even though the previous state was known.

## Fix

- each SSE payload is cached to `localStorage["attnbox:snapshot"]`
  (skipped over 2MB — the 1,000-session dogfood payload is ~300KB);
- on startup the cached snapshot renders immediately (marked as
  ever-connected), so a disconnected relaunch shows the real last-known
  list under the existing amber "last known state, reconnecting…" banner;
  live SSE data replaces it the moment the daemon is reachable.

## Evidence after fix

Offline reload of a fresh tab: 13 cards rendered from the snapshot,
banner shown, no skeleton (was: skeleton forever, 0 cards).

## Honest boundary

The snapshot is per-browser and unencrypted in localStorage, same trust
domain as the acked cache; token-gated deployments still require the token
for any live data. Notifications never fire from the cached snapshot (only
on new SSE transitions).
