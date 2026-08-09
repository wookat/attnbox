# GAP-ROUND-436 — rounds 425–435 合并回归审计（纯文档）

Round 436. Driver dimension: merged-surface runtime
regression audit (daemon soak + dual-theme smoke), first
since round-425. All eleven merges in the window were
docs-only, so this is a clean-baseline confirmation.

## Evidence (v0.4.8)

Daemon soak — ~16 minutes live @3,845→3,850 sessions
(largest to date), RSS sampled on the actual node PID per
the round-381 method note:

```text
RSS envelope 133–151 MB, flat, no upward trend
log errors (error|unhandled|ECONN) → 0
```

Dual-theme web smoke (fresh localStorage per theme):

```text
light → 66 cards · 0 page/console errors
dark  → 66 cards · 0 page/console errors
```

`pnpm test` on merged main: 98/98. Probe daemon killed,
port clear, temp files removed.

## Verdict

Merged surface fully green at the largest-yet scale.
No P0/P1; docs-only, no changeset.
