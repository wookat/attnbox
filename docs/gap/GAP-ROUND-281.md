# GAP-ROUND-281 — rounds 270–280 合并回归审计（纯文档）

Round 281. Driver dimension: runtime regression audit over the
merged surface of rounds 270–280 (all docs-only audit rounds) —
daemon soak + dual-theme smoke, first since round-268.

## Evidence (v0.4.8, live daemon @~3,430 sessions)

### 15-minute daemon soak

```text
t+0s    RSS 108 MB · total 3,429 · waiting 15
t+90s   RSS 136 MB
t+180s  RSS 128 MB
t+270s  RSS 129 MB · total 3,431
t+360s  RSS 131 MB
t+450s  RSS 131 MB
t+540s  RSS 140 MB
t+630s  RSS 140 MB · total 3,433
t+720s  RSS 136 MB
t+810s  RSS 140 MB
t+900s  RSS 145 MB · waiting 20
log errors: 0
```

RSS flat in the 108–145 MB envelope (historical: 103–148 MB
across rounds 203–268), zero errors in the daemon log while the
live org grew 3,429 → 3,433 sessions and waiting churned 14–20.

### Dual-theme smoke (real Chrome)

```text
light: 71 cards · 0 console/page errors
dark:  71 cards · 0 console/page errors
```

### Regression gate

```text
Tests  98 passed (98)
```

Probe daemon killed via listener PID, port clear, temp
script/log removed.

## Verdict

Merged surface of rounds 270–280 is clean. No P0/P1; docs-only,
no changeset.
