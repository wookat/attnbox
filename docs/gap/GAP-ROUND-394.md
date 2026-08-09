# GAP-ROUND-394 — 分诊全流程 UX 走查（纯文档）

Round 394. Driver dimension: full triage-flow UX walk
(search → filter → ack all → reverse ack + keyboard chain),
first since round-383. Live probe daemon @3,75x sessions.

## Evidence (v0.4.8)

```text
default view:    0 /api/items fetches (slim SSE) · 75 cards
lazy search:     exactly 1 full fetch on first query ·
                 "almanac" → 2 relevant cards
negative search: honest empty state · 0 extra fetches
keyboard j/e:    e on the j-selected item acks it (ledger
                 0→1) · second e un-acks (ledger →0)
✓ all done:      Needs-you tab (24 items) → 24-entry ledger,
                 cards stay listed as handled
reverse ack:     API POST /api/ack {id, at:null} loop → ledger
                 back to 0 (contract holds)
? help panel:    opens/closes correctly
```

Method note: selection styling no longer matches a
`ring|sel|active|outline` class regex, so DOM-side selection
sniffing reads null even though selection works (proven by the
e-ack round trip). Probes should assert selection via behavior
(ack effect), not class names.

Probe daemon killed, port clear, zero stale tabs; a first
noisy run (probe counted its own fetch() calls) was discarded
per method hygiene.

## Verdict

All triage contracts hold at the largest scale walked. No
P0/P1; docs-only, no changeset.
