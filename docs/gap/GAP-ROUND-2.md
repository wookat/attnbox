# GAP-ROUND-2 — production benchmark loop, round 2

Date: 2026-08-05. References this round: **GitHub notifications inbox** (read/done triage model), **Linear inbox** (grouping + keyboard triage; `e` = archive convention borrowed from Superhuman/Linear), plus continued **ccmux** comparison (collapsible project groups in its picker, observed live in round 1).

## Evidence log

- Dogfood carry-over from round 1: with 103 real sessions and 11–15 waiting, two pains dominated: (a) a waiting item you've *decided to handle later* keeps shouting (header count, title count, notification re-fires on every browser reload); (b) the "Everything else" list is a flat wall — ccmux's project grouping is visibly better for scanning.
- Devin API real-data bug found while dogfooding: 1 of 200 live sessions returned `status_enum: null` with coarse `status: "running"` → attnbox showed `unknown`. (GitHub notifications API could not be exercised directly — available tokens lack the `notifications` scope; the model below is based on its documented unread/done semantics and daily real use.)

## Gap list

| # | Reference does | attnbox today | Gap | Priority |
|---|---|---|---|---|
| 1 | GitHub notifications: mark done; item resurfaces only on *new* activity. Linear: archive with `e` | No triage model; ignored waiting items shout forever | Attention hygiene | **P0** |
| 2 | ccmux/Linear: collapsible project groups | Flat list | Scanability for 100+ sessions | **P0** |
| 3 | — (correctness) | Devin `status_enum: null` → `unknown` in UI | Real-data status misread | **P0** |
| 4 | GitHub notifications: unread state syncs across devices | attnbox ack state is per-browser localStorage | Acceptable for local-first v1; document | P2 |

## Round-2 fixes (this round)

- **P0-1 handled/ack model**: `✓` on waiting cards and `e` on the selected row mark an item *handled* (stored as `id → lastActivityAt` in `localStorage["attnbox:acked"]`). Handled items leave "Needs you", stop counting toward header/tab-title, are skipped by notifications, and — like GitHub notifications — **resurface automatically when the agent has newer activity** (`lastActivityAt > acked[id]`). `✓` again un-handles.
- **P0-2 project grouping**: `⊞` toggle (persisted) groups "Everything else" by `project` (fallback: agent) with collapsible headers. The "Needs you" section stays flat — attention first.
- **P0-3 Devin unknown fix**: fall back to the coarse `status` field (`running` → working) when `status_enum` is null.

## Regression verdict

Re-run on real data (103 sessions): marking two waiting Devin items handled dropped header/title count accordingly and both moved out of "Needs you", dimmed; grouping collapses the wall into per-project sections; the `unknown` Devin session now shows `working`. Honest remaining shortfalls: ack state is per-browser (documented, P2); Devin sessions carry no project metadata, so a cloud-heavy inbox collapses into one `(devin)` group — grouping shines mainly for local agents with real project paths; no act-in-place for local agents (by design). Round-3 candidates: performance numbers at larger scale, Node LTS matrix in CI, error-message polish on bad configs.
