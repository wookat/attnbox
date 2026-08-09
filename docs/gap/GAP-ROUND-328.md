# GAP-ROUND-328 — 分诊全流程 UX 走查（纯文档）

Round 328. Driver dimension: full triage-flow UX re-walk —
search → filter → ack all → un-ack plus keyboard chain, first
since round-315. Real Chrome/CDP against a live probe daemon
@3,593 sessions · 16 waiting; probe cleared `attnbox:filter` /
`attnbox:notify` first and blurred the search box before
keyboard shortcuts (round-304 method note).

## Evidence (v0.4.8)

```text
default view:        0 full /api/items fetches (slim SSE holds)
negative search:     exactly 1 lazy fetch · honest empty state
positive search:     3,587 hits ("devin" matches across the
                     lazily loaded done set — by design) ·
                     still exactly 1 total lazy fetch
keyboard j+e:        1 ack ledger entry
API un-ack:          {id, at:null} loop → ledger back to 0
✓ all done:          18 entries acked in one click
final cleanup:       API un-ack loop → ledger 0
? help panel:        opens and lists shortcuts
```

All triage contracts hold. Probe daemon killed, port clear,
temp script/log removed, zero stale probe tabs.

## Verdict

No P0/P1; docs-only, no changeset.
