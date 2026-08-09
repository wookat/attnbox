# GAP-ROUND-315 — 分诊全流程 UX 走查（纯文档）

Round 315. Driver dimension: full triage-flow UX walkthrough —
search → filter → ack all → un-ack plus keyboard chain, first
since round-304. Real Chrome/CDP against a live probe daemon.

## Evidence (v0.4.8, live org @3,566 sessions · 19 waiting)

```text
default view:        0 full /api/items fetches (slim SSE holds)
negative search:     exactly 1 lazy fetch · honest empty state
search round-trip:   still exactly 1 total lazy fetch
keyboard j+e:        1 ack ledger entry (search blurred first,
                     per round-304 method note)
API un-ack:          {id, at:null} loop → ledger back to 0
✓ all done:          19 entries acked in one click
final cleanup:       API un-ack loop → ledger 0
? help panel:        opens and lists shortcuts
```

Probe daemon killed via listener PID, port clear, temp script
and log removed, zero stale probe tabs (round-308 note applied).
Filter/notify localStorage cleared before the run (round-185
note).

## Verdict

No P0/P1; docs-only, no changeset.
