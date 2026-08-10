# GAP-ROUND-460 — 分诊全流程 UX 走查（纯文档）

Round 460. Driver dimension: full triage-flow UX
walkthrough (search → filter → ack all → un-ack +
keyboard chain), first since round-449. Probe daemon
on port 4984 against the live org (@3,916 sessions,
largest to date), clean localStorage baseline.

## Evidence (v0.4.8)

```text
default view       → 83 cards · 0 full /api/items
                     fetches after settle (slim SSE
                     contract holds)
lazy search        → user-style single input "devin"
                     → exactly 1 /api/items fetch ·
                     3,910 hits
negative search    → honest empty state, 0 cards
j + e ack          → ack ledger 0→1 (top-level acked
                     map, authoritative)
e again (un-ack)   → ledger 1→0
✓ all done         → 15 waiting items acked in one
                     action, ledger = 15
API reverse ack    → {id, at:null} per item → ledger
                     back to 0, no orphans
? help panel       → opens with shortcut reference,
                     Escape closes
```

Cleanup: port 4984 clear, temp script/log removed,
0 residual CDP pages.

## Verdict

All triage contracts hold at record scale. No P0/P1;
docs-only, no changeset.
