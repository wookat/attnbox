# GAP-ROUND-366 — 无障碍全面复审（纯文档）

Round 366. Driver dimension: full accessibility re-audit, first
since round-355. axe-core (wcag2a/wcag2aa/wcag21aa) via real
Chrome/CDP against a live probe daemon (~3,69x sessions); done
tab audited on first 60 cards; grouped state driven via
`attnbox:group` localStorage (round-323 method).

## Evidence (v0.4.8)

```text
light/default            0 violations
light/waiting-tab        0 violations
light/done-tab(first60)  0 violations
light/grouped            0 violations
light/help-panel         0 violations
dark/default             0 violations
dark/waiting-tab         0 violations
dark/done-tab(first60)   0 violations
dark/grouped             0 violations
dark/help-panel          0 violations
```

10/10 states clean — matches the eighteen prior full audits.
No a11y regression across the rounds 356–365 merge surface.
Probe daemon killed, port clear, zero stale tabs.

## Verdict

No P0/P1; docs-only, no changeset.
