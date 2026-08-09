# GAP-ROUND-308 — 无障碍全面复审（纯文档）

Round 308. Driver dimension: accessibility re-audit — axe-core
WCAG 2A/2AA/21AA across both themes × five interactive states,
first since round-296.

## Evidence (v0.4.8, live daemon @~3,490 sessions, real Chrome)

```text
light/default: 0 violations     dark/default: 0 violations
light/grouped: 0 violations     dark/grouped: 0 violations
light/help:    0 violations     dark/help:    0 violations
light/done:    0 violations     dark/done:    0 violations
light/search:  0 violations     dark/search:  0 violations
```

All 10 states clean — level with the twelve previous full
audits (rounds 147–296). No a11y regression across the rounds
297–307 merge surface (all docs-only).

Method note (host, not product): the first dark-theme pass
stalled because the box was under severe memory pressure — ~50
stale localhost/about:blank tabs left by weeks of probes had
accumulated in the shared Chrome (load avg 75, one renderer at
1.3 GB, kswapd thrashing). Closing them via the CDP `/json/close`
endpoint restored load <15 within a minute and the rerun
completed normally. Future long-lived sessions should close
probe tabs at the end of every round.

Probe daemon killed via listener PID, port clear, temp scripts
and log removed.

## Verdict

No P0/P1; docs-only, no changeset.
