# GAP-ROUND-27 — production benchmark loop, round 27

Date: 2026-08-05. Robustness probe round: negative-input fuzz of the daemon HTTP API on the live daemon (real 104-session workspace), in the spirit of round-3's "no stack-trace garbage, no silent lies".

## Probes and findings

| Probe (`POST /api/ack`) | Before | After |
|---|---|---|
| malformed JSON | 400 ✓ | 400 |
| missing / mistyped fields | 400 ✓ | 400 |
| **unknown item id** | **200 — accepted, persisted to `acked.json` forever** | 404 `unknown item id` |
| **`at` not a timestamp** | **200 — garbage persisted** | 400 `at must be an ISO timestamp or null` |
| **3 MB body** | **200 — 3 MB key persisted to `acked.json`** | 413 `body too large` (64 KiB cap, same as `/api/reply`) |
| un-ack (`at: null`) of a since-vanished id | 200 ✓ (must keep working — cleanup path) | 200 |
| `/api/reply` bad id / traversal path / GET on POST route | clean 502 / SPA fallback / SPA fallback ✓ | unchanged |

The three failures let any local process grow `~/.attnbox/acked.json` without bound with junk that every payload and SSE frame then carries. Localhost-only, so not remotely exploitable — but a persistent-state endpoint accepting arbitrary garbage fails the round-3 bar.

## Fix

`handleAck` now enforces, in order: 64 KiB body cap (413) → JSON/shape (400) → `Date.parse`-able `at` (400) → id must exist in the current snapshot when setting (404; un-ack skips this so stale entries can always be removed). Tests cover all three new rejections; the polluted `acked.json` entries from probing were removed.

## Evidence

Re-probe on the live daemon: unknown id → 404, garbage `at` → 400, 3 MB body → 413, real waiting item ack → 200, un-ack → 200. Quality gates: lint/build/typecheck green, 79 tests green (12 files).

## Carried gaps

Unchanged: Gemini key; Cursor login (requested); Copilot; macOS; heuristic FP/FN quantification.
