# GAP-ROUND-344 — 无障碍全面复审（纯文档）

Round 344. Driver dimension: accessibility full re-audit — axe-core
(wcag2a / wcag2aa / wcag21aa / wcag22aa) across both themes × five
interactive states, first since round-333. Real Chrome/CDP probe
against a live probe daemon (~3,6xx sessions); done state audited
on first 60 cards per standing method; search state entered after
reload; grouped state driven via `attnbox:group=on` localStorage.

## Evidence (v0.4.8)

```text
light/default: 0 violations
light/grouped: 0 violations
light/done(60): 0 violations
light/search: 0 violations
light/help: 0 violations
dark/default: 0 violations
dark/grouped: 0 violations
dark/done(60): 0 violations
dark/search: 0 violations
dark/help: 0 violations
```

10/10 states clean — level with rounds 147/162/178/196/206/219/236/
248/262/274/284/296/308/323/333. Probe daemon killed, port clear,
zero stale probe tabs.

## Verdict

No a11y regression across the rounds 334–343 merge surface. No
P0/P1; docs-only, no changeset.
