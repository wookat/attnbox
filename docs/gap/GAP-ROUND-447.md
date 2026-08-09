# GAP-ROUND-447 — rounds 436–446 合并回归审计（纯文档）

Round 447. Driver dimension: runtime regression audit
of the merged surface since round-436 (rounds 436–446:
soak, competitive scan, UX walkthrough, collector
live-fire, docs freshness, data health, CLI, axe,
PWA/SSE, token/webhook, handoff — all docs-only).

## Evidence (v0.4.8, main)

Daemon soak (~16 min, probe port 4985, node PID
sampled):

```text
scale     → 3,886 sessions (largest to date)
RSS       → 120–151 MB, steady within envelope,
            no monotonic growth
log errors→ 0 (error|unhandled|ECONN)
```

Dual-theme web smoke (clean localStorage per theme,
`main li` count):

```text
light → 103 cards · 0 page errors · 0 console errors
dark  → 103 cards · 0 page errors · 0 console errors
```

Test suite on merged main:

```text
Tests  98 passed (98)
```

Cleanup: port 4985 clear, temp script/log removed,
0 residual CDP pages.

## Verdict

Merged surface rounds 436–446 fully green. No P0/P1;
docs-only, no changeset.
