# GAP-ROUND-303 — rounds 293–302 合并回归审计（纯文档）

Round 303. Driver dimension: runtime regression audit — daemon
soak (RSS / error rate) + dual-theme smoke over the rounds
293–302 merge surface (all docs-only), first since round-293.

## Evidence (v0.4.8, live daemon @3,486–3,488 sessions)

15-minute soak, RSS sampled every 90 s:

```text
t+0s    RSS  96 MB · total 3,486 · waiting 8
t+90s   RSS 119 MB
t+180s  RSS 124 MB
t+270s  RSS 128 MB
t+360s  RSS 133 MB
t+450s  RSS 130 MB
t+540s  RSS 134 MB
t+630s  RSS 132 MB
t+720s  RSS 136 MB
t+810s  RSS 136 MB
t+900s  RSS 129 MB · total 3,488 · waiting 11
log errors: 0
```

Flat after warm-up (96→~130 MB plateau), inside the historical
envelope (103–148 MB across rounds 203–293 soaks) at the largest
scale soaked to date. Zero log errors.

Dual-theme smoke (real Chrome/CDP):

```text
light: 11 cards · 0 console/page errors
dark:  11 cards · 0 console/page errors
```

Main regression `pnpm test`: 98 passed (98) after every merge in
the window. Daemon killed via listener PID, port clear, temp
script/log removed.

## Verdict

No P0/P1; docs-only, no changeset.
