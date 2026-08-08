# GAP-ROUND-293 — rounds 282–292 合并回归审计（纯文档）

Round 293. Driver dimension: merged runtime regression audit —
daemon soak (RSS/error rate) + dual-theme smoke over the rounds
282–292 merge surface, first since round-281.

## Evidence (v0.4.8, live daemon @~3,463 sessions)

15-minute soak, samples every 90 s:

```text
t+0s    RSS 109 MB · total 3,462 · waiting 26
t+90s   RSS 124 MB
t+180s  RSS 127 MB
t+270s  RSS 131 MB
t+360s  RSS 133 MB
t+450s  RSS 140 MB
t+540s  RSS 141 MB
t+630s  RSS 140 MB · total 3,463
t+720s  RSS 146 MB
t+810s  RSS 133 MB
t+900s  RSS 137 MB · waiting 27
log errors: 0
```

Dual-theme Chrome smoke (real browser, live data):

```text
light: 70 cards · 0 console/page errors
dark:  70 cards · 0 console/page errors
```

RSS stays flat in the historical 103–148 MB envelope at the
largest scale soaked to date (3,463 sessions), zero log errors,
both themes render clean. Main regression after each merge in
the window held `Tests 98 passed (98)`. Probe launched with the
absolute CLI path, listener PID verified via `ss -tlnp`, killed
by listener PID; port clear, temp script/log removed.

## Verdict

No P0/P1; docs-only, no changeset.
