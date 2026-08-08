# GAP-ROUND-201 — 移动端 Lighthouse 性能复测（纯文档）

Round 201. Driver dimension: performance — inbox mobile Lighthouse
re-test (first since round-189, now ~3,214 sessions).

## Evidence (v0.4.8, live daemon @3,214 sessions, Lighthouse mobile,
`CHROME_PATH` = Playwright chromium)

```text
Run 1: Perf 94 / TBT 10 ms / LCP 2.4 s
Run 2: Perf 94 / TBT  0 ms / LCP 2.6 s
Run 3: Perf 94 / TBT  0 ms / LCP 2.4 s
```

- Median perf **94**, TBT ≤10 ms — flat with rounds 152/172/189
  despite ~50 more sessions than round-189.
- Virtualization trigger line (perf <70 or reproducible TBT
  >600 ms) remains far away; stays parked.

Probe daemon torn down; port verified clear; reports removed.

## Verdict

Slim SSE gain holds at grown scale. No P0/P1; docs-only, no
changeset.
