# GAP-ROUND-112 — v0.4.6 发布后 daemon 回归 soak（纯文档）

Round 112. Driver dimension: real testing — post-release regression
audit of the round-111 detail batching at daemon level (the clean-env
check in the release loop only exercised one-shot `ls`).

## Evidence

Local daemon (main @ v0.4.6 packages) against the live workspace
(~2,940 sessions, 18–22 waiting during the window):

- 3-minute soak: RSS 137 → 128 → 127 MB (stable, no growth),
  0 errors in the daemon log.
- `/api/items` at t0 and t+3 m: 20/20 and 18/18 waiting items carry
  `detail` — batching holds under the 3-second daemon cycle with the
  `updated_at` cache doing its job (no repeat fetch storm; error-free
  log implies no 4xx from the detail endpoint).
- Clean-env verification (release loop): 22/22 with detail on
  `npx attnbox ls`.

## Verdict

No P0/P1; round-111 fix healthy at both one-shot and daemon level.
Docs-only; no changeset.
