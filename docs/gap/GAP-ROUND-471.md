# GAP-ROUND-471 — 分诊全流程 UX 走查（纯文档）

Round 471. Driver dimension: full triage-flow UX
walkthrough (search → filter → ack all → reverse ack
+ keyboard chain), first since round-460. Probe
daemon on port 4986, clean localStorage, real live
data.

## Evidence (v0.4.8, main, 3,926 sessions — largest
to date)

```text
default view    → 75 cards · 0 full /api/items
                  fetches after settle (slim SSE)
lazy search     → user-style single input "devin"
                  → exactly 1 /api/items fetch ·
                  3,920 hits
negative search → honest empty state, 0 cards
j + e ack       → ack ledger 0→1
e again (un-ack)→ ledger 1→0
✓ all done      → 15 waiting items acked
API reverse ack → ledger back to 0 (POST /api/ack
                  {id, at:null} per item)
? help panel    → opens with shortcut reference
```

Cleanup: port 4986 clear, temp script/log removed,
0 residual CDP pages.

## Verdict

All triage-flow contracts hold at the largest scale
yet. No P0/P1; docs-only, no changeset.
