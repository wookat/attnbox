# GAP-ROUND-339 — 分诊全流程 UX 走查（纯文档）

Round 339. Driver dimension: triage full-flow UX walkthrough —
search → filter → ack → ✓ all done → API un-ack + keyboard chain,
first since round-328. Real Chrome/CDP probe against a live probe
daemon at 3,612 sessions.

## Evidence (v0.4.8)

```text
default state:      0 /api/items fetches in 5s idle (slim SSE only)
lazy search:        exactly 1 /api/items fetch on first query
search "devin":     results render across lazily-loaded set
negative search:    honest empty state (no phantom cards)
keyboard j → e:     ack ledger 0 → 1 (selection + ack roundtrip)
✓ all done:         18 acked entries
API un-ack:         {id, at:null} loop → acked map back to 0
? help panel:       visible, Escape closes
```

Method notes applied: cleared `attnbox:filter`/`attnbox:group`
before baseline; blurred search before keyboard chain; un-ack via
`POST /api/ack {id, at:null}` and verified top-level `acked` map
zero. Probe daemon killed, port clear, zero stale probe tabs.

Probe-side note (not a product issue): the card-selection assertion
selector (`li[data-selected]`) didn't match this DOM, but the j→e
ack ledger transition proves selection works; future probes should
assert via the ack transition, not a selection attribute.

## Verdict

All triage contracts hold at 3,612 sessions (largest UX walkthrough
to date). No P0/P1; docs-only, no changeset.
