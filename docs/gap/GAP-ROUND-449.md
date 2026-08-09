# GAP-ROUND-449 — 分诊全流程 UX 走查（纯文档）

Round 449. Driver dimension: full triage-flow UX
walkthrough (search → filter → ack all → un-ack +
keyboard chain), first since round-438. Probe daemon
on port 4985→4984, clean localStorage baseline,
single user-style search input (round-438 method
note), keyboard asserts after blurring the search box.

## Evidence (v0.4.8, @3,894 sessions — largest to date)

```text
default view       → 99 cards · 0 full /api/items
                     fetches (slim SSE contract)
lazy search "devin"→ exactly 1 /api/items fetch ·
                     3,888 hits
negative search    → honest empty state ("Nothing
                     here", 0 cards, header counts
                     intact)
j/e ack round-trip → ledger 0→1 on e · e toggle
                     un-acks back to 0
✓ all done         → 21 waiting items acked ·
                     API un-ack {id, at:null} loop
                     returns ledger to 0
? help panel       → shown, Escape closes
```

Cleanup: port 4984 clear, temp script/log removed,
0 residual CDP pages, ack ledger restored to baseline.

## Verdict

All triage contracts hold at record scale. No P0/P1;
docs-only, no changeset.
