# GAP-ROUND-138 — 第七批竞品扫描（纯文档）

Round 138. Driver dimension: competitor research — kookr every-round
watch + agent-deck follow-up + entrant sweep (first since round-131).

## Found

- **ccmux** (116 stars): real attention-surface movement — merged the
  Escape stale-waiting fix (their issue #117; positive pane evidence
  downgrades the pinned waiting) and shipped a full session-handoff
  feature (delivery gated on fresh pane evidence, source-cwd
  validation, pick mode). Their signal relies on `tmux capture-pane`
  (screen-reading), unavailable under our zero-intrusion constraint —
  round-72's won't-fix decision stands unchanged; LIMITS wording
  already covers it.
- **kookr**: still high-frequency (PRs to #2181), all internals (TUI
  dialog focus, compact serialization); no cloud aggregation.
- **agent-deck**: kept iterating after round-131 (GNOME Wayland focus
  connector, OpenCode prompt tracking, install docs); still 0-star,
  Linux-local.
- **coslash**: description expanded to "attention layer + session
  reconstruction + handoff brief" — same direction as our round-109
  P2 observation — but no commits. **kelpie**: still 404.

Batch-seven section in `docs/COMPARISON.md` (四之九).

## Verdict

Two local rivals (ccmux, coslash) are evolving from attention surface
toward action/handoff on top of it — validating the round-109
waiting-handoff-brief P2 observation. Cloud aggregation + unified
local/cloud view remains uncontested. No P0/P1; docs-only, no
changeset.
