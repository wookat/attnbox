# GAP-ROUND-337 — rounds 326–336 合并回归审计（纯文档）

Round 337. Driver dimension: runtime regression audit over the
rounds 326–336 merge surface (all docs-only) — 15-minute daemon
soak at the largest scale to date plus dual-theme browser
smoke, first since round-326.

## Evidence (v0.4.8)

Daemon 15-min soak (live org):

```text
t0      RSS 123 MB · 3,612 total · 24 waiting
t+90s   130 MB      t+540s  132 MB
t+180s  135 MB      t+630s  134 MB
t+270s  135 MB      t+720s  145 MB
t+360s  136 MB      t+810s  147 MB
t+450s  136 MB      t+900s  143 MB · 3,615 total · 17 waiting
log errors/unhandled/ECONN: 0
```

RSS flat within the historical 96–150 MB envelope; zero errors
at 3,615 sessions (largest soak to date).

Dual-theme smoke (real Chrome/CDP):

```text
light: 67 cards · 0 console errors
dark:  67 cards · 0 console errors
```

`pnpm test`: 98 passed (98). Probe daemon killed, port clear,
zero stale probe tabs.

## Verdict

No P0/P1; docs-only, no changeset.
