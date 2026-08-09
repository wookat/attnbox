# GAP-ROUND-392 — rounds 381–391 合并回归审计（纯文档）

Round 392. Driver dimension: runtime regression audit over the
rounds 381–391 merge surface (all docs-only), first since
round-381. Live daemon soak + dual-theme smoke.

## Evidence (v0.4.8)

Daemon ~17-minute soak @3,762→3,763 sessions (largest to
date), actual node PID sampled per the round-381 method note:

```text
t0      114.3 MB   (warm-up)
t+3m    141.9 MB
t+6m    142.1 MB
t+9m    145.9 MB
t+12m   156.2 MB
t+15m   138.7 MB
final   152.9 MB
error/unhandled/reject log lines: 0
```

RSS oscillates 138–156 MB — flat envelope, no growth trend
(soak series now @3,226…3,763, rounds 203…392).

Dual-theme web smoke (fresh localStorage each):

```text
light: 76 cards · 0 console errors
dark:  76 cards · 0 console errors
```

Repo gate: 98/98 tests green on main after #425.

Probe daemon killed, port clear.

## Verdict

Rounds 381–391 merge surface fully green at the largest scale
soaked. No P0/P1; docs-only, no changeset.
