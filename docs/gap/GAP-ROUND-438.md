# GAP-ROUND-438 — 分诊全流程 UX 走查（纯文档）

Round 438. Driver dimension: triage full-flow UX walk
(search → filter → ack all → un-ack + keyboard chain),
first since round-427. Live daemon @3,8xx sessions, fresh
localStorage baseline.

## Evidence (v0.4.8)

```text
default state          → 65 cards · 0 full /api/items fetches
lazy search "review"   → 17 hits · exactly 1 /api/items fetch
negative search        → 0 cards · honest empty surface
j → e ack round-trip   → acked 1 → un-ack back to 0
? help panel           → visible, Escape closes
✓ all done             → 14 items into acked ledger
API un-ack sweep       → {id, at:null} loop → acked map 0
```

Two first-run probe artifacts, both resolved on clean
re-runs (not product issues):

- first probe used `fill()` twice on the search box
  (query + clear) which naturally produced 2 lazy fetches;
  typed-once user-style input (`pressSequentially`) shows
  exactly 1 fetch per the contract.
- first probe pressed `j`/`e` while focus was still in the
  cleared search input, so the keyboard chain was a no-op;
  after moving focus to the page body, j→e ack and e un-ack
  both round-trip through the daemon acked map. Selection
  is behavior-asserted via ledger migration per the
  round-394 method note (no DOM selected-marker reliance).

Probe daemon killed, port clear, zero residual tabs,
localStorage restored.

## Verdict

All triage-flow contracts hold. No P0/P1; docs-only, no
changeset.
