# GAP-ROUND-304 — 分诊全流程 UX 走查（纯文档）

Round 304. Driver dimension: UX walkthrough — full triage flow
(search → filter → ack all → un-ack + keyboard chain), first
since round-290.

## Evidence (v0.4.8, live daemon @3,488 sessions, real Chrome/CDP)

```text
default state:        0 full /api/items fetches (slim SSE holds)
lazy search:          exactly 1 full fetch on first query · 3,482 results
negative search:      0 cards · honest "Nothing here" empty state
keyboard j + e:       acked 0 → 1 (single-key ack works)
e again (undo):       acked 1 → 0 (toggle un-ack works)
Needs You ✓ all done: 11 items acked in one click
API un-ack loop:      {id, at: null} per item → acked map back to 0
? help panel:         opens as role="dialog", Escape closes
```

All round-290 contracts hold at a larger scale. One probe-side
note (not a product issue): the first run pressed `j`/`e` while
focus was still in the search input, so the keyboard chain
silently no-oped — blur the search box (Escape + click main)
before driving shortcuts; run discarded and repeated.

Probe daemon killed via listener PID, port clear, temp scripts
and log removed, ack ledger restored to zero.

## Verdict

No P0/P1; docs-only, no changeset.
