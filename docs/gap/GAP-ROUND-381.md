# GAP-ROUND-381 — rounds 370–380 合并回归审计（纯文档）

Round 381. Driver dimension: runtime regression audit over the
rounds 370–380 merge surface (all docs-only), first since
round-370. Live probe daemon + real Chrome/CDP.

## Evidence (v0.4.8)

Daemon soak, ~20 minutes at 3,729→3,740 sessions (largest to
date):

```text
RSS:     148.5–153.5 MB steady (node process; samples across
         the window, no growth trend)
errors:  0 in daemon log (no error/unhandled/reject lines)
API:     /api/items live throughout, totals tracking the org
         naturally (3,729 → 3,740)
```

Dual-theme smoke (fresh localStorage per theme):

```text
light:  79 cards rendered · 0 console errors
dark:   80 cards rendered · 0 console errors
```

Method note: one transient manifest-icon console error appeared
on a single light-theme run while `/icon.svg` served 200
`image/svg+xml` directly — same signature as round-314's known
transient; two re-runs were 0-error, not a defect. RSS sampling
must target the node PID, not the `setsid`/bash wrapper
(`pgrep -f` matches the wrapper too — 1.9 MB readings are the
wrapper, re-sample the `comm=node` PID).

Probe daemon killed, port clear, zero stale probe tabs.

## Verdict

The rounds 370–380 merge surface (all docs-only) shows no
runtime regression: RSS envelope matches rounds 359/370, zero
errors, both themes clean. No P0/P1; docs-only, no changeset.
