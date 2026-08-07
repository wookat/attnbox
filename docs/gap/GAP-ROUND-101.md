# GAP-ROUND-101 — waiting webhook 端到端复测（真实转换，纯文档）

Round 101. Driver dimension: real testing — the `ATTNBOX_WEBHOOK_URL`
channel had not fired against a real transition since round-73's ntfy
test; the round-71 storm guard deserved a live re-check at 2.9k scale.

## Probed (live inbox, local HTTP sink on 127.0.0.1:4970)

- **Startup silence**: daemon started with ~6 pre-existing waiting
  items → 0 POSTs (baseline semantics hold).
- **Real transition fires exactly once**: woke the round-93 probe
  session and had it ask a new question; on `working → blocked` the
  sink received exactly one POST for the probe id with
  `{"event":"waiting", item:{...authoritative...}}`.
- During the same window three unrelated org sessions genuinely
  entered waiting and each produced exactly one POST — no duplicates,
  no re-fires on subsequent poll cycles.
- Replied `PING2` through `/api/reply` (200) to release the probe;
  probe put back to sleep (0 ACU total).

## Verdict

No P0/P1: baseline-quiet startup, once-per-transition delivery, and
reply release all per rounds 69/71 contract at current scale.
Docs-only; no changeset.
