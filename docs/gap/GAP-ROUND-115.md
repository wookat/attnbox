# GAP-ROUND-115 — 第四批竞品次日复扫（纯文档）

Round 115. Driver dimension: competitor research — first
shortened-interval re-scan after the round-109 heat-up (commit-stream
level, not just READMEs).

## Found

- **kookr**: 5+ merges in a day, PR numbers at #2172 — the fastest
  iterating direct-adjacent competitor to date. Still no cloud-agent
  coverage. Flagged as a must-check on every future competitor round.
- **kelpie**: dropped its "read-only" framing (now has
  restart/stop control surface); daily polish commits.
- **ccmux #126**: fixed the Escape-stale-waiting problem (their
  #117 — the same failure mode we decided *not* to fix in round-72)
  using tmux `capture-pane` "positive screen evidence". That signal
  requires pane capture, unavailable under our zero-intrusion
  read-only-transcript constraint, so the round-72 no-fix decision
  stands — but LIMITS wording is updated to note ccmux's fix and why
  it doesn't transfer.
- coslash/atm/Chorus/pulse-protocol: no attention-surface movement.

Batch-five details in `docs/COMPARISON.md`.

## Verdict

No P0/P1; positioning unchanged (cloud aggregation still
uncontested). Docs-only; no changeset.
