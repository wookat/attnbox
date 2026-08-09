# GAP-ROUND-326 — rounds 314–325 合并回归审计（纯文档）

Round 326. Driver dimension: runtime regression audit over the
rounds 314–325 merge surface — 15-minute daemon soak (RSS /
error rate) plus dual-theme browser smoke, first since
round-314. Real daemon against the live org, real Chrome/CDP.

## Evidence (v0.4.8, live org — largest soak to date)

15-minute daemon soak @3,586→3,591 sessions:

```text
t0      RSS 132 MB · 3,586 total · 20 waiting
t+90s   126 MB      t+540s  140 MB
t+180s  147 MB      t+630s  143 MB
t+270s  142 MB      t+720s  150 MB
t+360s  137 MB      t+810s  150 MB
t+450s  139 MB      t+900s  144 MB · 3,591 total · 16 waiting
log errors/unhandled/ECONN: 0
```

RSS flat in the 126–150 MB envelope (consistent with the
96–150 MB historical band across eleven prior soaks), zero
errors over the full window while live data churned.

Dual-theme browser smoke:

```text
light: 81 cards · 0 console errors
dark:  81 cards · 0 console errors
```

98-test suite green on updated main. Probe daemon killed, port
clear, logs removed, zero stale probe tabs.

## Verdict

No P0/P1; docs-only, no changeset.
