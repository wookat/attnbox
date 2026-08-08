# GAP-ROUND-214 — 移动端 Lighthouse 性能复测（纯文档）

Round 214. Driver dimension: performance re-test — inbox mobile
Lighthouse @3,246 sessions (first since round-201).

## Evidence (v0.4.8, live daemon, Playwright Chromium via
CHROME_PATH, mobile preset, five runs)

```text
Run 1: Perf 84 / TBT 160 ms / LCP 3.5 s
Run 2: Perf 85 / TBT 103 ms / LCP 3.5 s
Run 3: Perf 84 / TBT 124 ms / LCP 3.5 s
Run 4: Perf 86 / TBT  79 ms / LCP 3.4 s / FCP 2.7 s
Run 5: Perf 85 / TBT 123 ms / LCP 3.5 s / FCP 2.7 s
```

- Median perf **85** — down from 94 across rounds 152/172/189/201.
- TBT 79–160 ms — still far from the 600 ms virtualization
  trigger; perf 85 is well above the <70 trigger line.
- The delta is paint-driven (FCP 2.7 s / LCP 3.4–3.5 s vs 2.4 s at
  round-201), not script-driven. No code has changed since
  round-201 (docs-only rounds); host load was low (loadavg 0.48).
  Cause not yet attributable — could be environment drift or data
  shape; entered as an **observation, not graded**: re-measure
  next perf round and grade only if the paint regression
  reproduces with a code-plausible cause.

## Verdict

Above all trigger lines; virtualization stays deferred. Perf-drop
observation on file for follow-up. No P0/P1; docs-only, no
changeset.
