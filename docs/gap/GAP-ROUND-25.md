# GAP-ROUND-25 — production benchmark loop, round 25

Date: 2026-08-05. Reference: GitHub notifications' "mark all as done" / Linear's bulk triage — good inboxes let you clear the deck in one action, not N clicks.

## Gap

With 9–13 items waiting (our real steady state), acking each item takes one click/keystroke apiece. Every other item-level affordance existed (✓, `e`, ack-on-reply), but no bulk clear.

## Fix

The *Needs you* section header gains a **✓ all done** button (shown when >1 item is waiting) that acks every visible waiting item — it respects the current search/filter, so "clear everything matching this query" also works. Each ack goes through the existing `toggleAck` path: daemon-persisted, SSE-synced, resurface-on-new-activity semantics unchanged.

## Evidence

Live daemon, real workspace (13 waiting): button renders, one click → "No one is waiting on you 🎉", tab-title count cleared; state reverted after the test. Quality gates: lint/build/typecheck green, 79 tests green.

## Carried gaps

Unchanged (Gemini key, Cursor login — reported and pending, Copilot, macOS, heuristic FP/FN, npm README next release).
