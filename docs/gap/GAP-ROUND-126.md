# GAP-ROUND-126 — 交接文档整备（纯文档）

Round 126. Driver dimension: handoff/docs upkeep (first since
round-120; six rounds and two releases have landed since).

## What was updated

`docs/handoff-context.md`:

- Versions refreshed: attnbox 0.4.8 / core 0.2.1 / collectors 0.2.7 /
  daemon 0.4.0; v0.4.8 Release built; test count 97 → 98; changeset
  ledger now empty.
- Two new pitfall entries:
  - slim SSE (round-125): the web UI subscribes `?slim=1`; events omit
    done items while `summary` stays full; done items are lazily
    fetched from `/api/items` and invalidated on
    `summary.total - items.length` drift. New web view logic must read
    `allItems` (with lazy done merged) rather than `data.items`.
  - offline snapshot restore is lazy since round-125 — the cached
    ~1 MB parse is skipped whenever the live SSE snapshot arrives
    first; do not regress to eager parse-on-boot.
- P2 ledger: round-106's performance trigger is recorded as fired and
  resolved in round-125 (slim SSE / payload瘦身); virtualization stays
  deferred unless perf <70 reproduces *after* slim.
- Rounds 111–125 convergence summary extended (121 gate/webhook
  re-test, 122 fifth competitor batch, 123 mobile touch walkthrough,
  124 local-collector live probe, 125 slim SSE P1 → v0.4.8).

## Checks

- No P0/P1 this round; no package behavior change, no changeset.
- v0.4.8 clean-env regression (recorded here for the ledger): fresh
  `npm install attnbox@0.4.8` → daemon dep 0.4.0, web 200, slim event
  stream carried 64 items / 0 done with full summary total 2,983,
  `/api/items` still full (2,983 items, 2,919 done).
