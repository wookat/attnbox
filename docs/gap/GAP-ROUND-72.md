# GAP-ROUND-72 — 竞品动向复查 + escaped-prompt stale waiting 边界（纯文档）

Round 72. Driver dimension: competitor research + real-data health.

## Competitor movement

- **ccmux**: active (5 commits in 2 days). Notable: PR #126 fixed
  *stale `waiting` after an escaped permission prompt* (#117) — Escape
  fires no hook, so their marker pinned waiting forever. Their fix is
  specific to their marker-re-emission tie-break; see below for what it
  means for us. Rest: TUI polish, skills split — not attention-surface.
- **Omnigent**: active, but current commits are composer/sandbox UI —
  no attention-inbox movement.
- **New entrants scan** (GitHub, "agent attention"/"unified inbox"):
  a handful of 0–3★ hobby projects (`maat` "multi-agent attention
  terminal", `straydeck` "multi-agent attention cockpit",
  `agent-attention-vscode`). All local-terminal quadrant, none unify
  cloud agents, none with traction. Positioning unchanged; the
  "attention" framing keeps spreading — window intact but not forever.

## Same-class bug audit: escaped permission prompt

ccmux #117 applies to attnbox too, verified by reading our own paths:

- Claude hooks: Escape fires no hook; the persisted state stays
  `waiting/approve` (`claudeHooks.ts` has no clearing event for it).
- Transcript heuristic: the tail keeps its unresolved `tool_use` →
  also waiting. Both signals agree on the wrong answer.

**Decision: document, don't "fix".** There is no signal to distinguish
"escaped and walked away" from "genuinely waiting for approval" —
agents legitimately wait hours, so a staleness cap on waiting would
trade a visible false positive (dismissable with `e`) for silent false
negatives (missed waiting — our worst failure mode). LIMITS now states
the boundary and the `e`/`✓` escape hatch. Re-evaluate if Claude ships
a prompt-dismissed hook event.

## Dogfood health

1,006 sessions, waiting 17–26 over the day (bursts real, webhook now
storm-proof), clean v0.4.1 regression this round.

No package behavior change; no changeset.
