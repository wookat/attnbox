# GAP-ROUND-176 — 第十二批竞品扫描（纯文档）

Round 176. Driver dimension: competitor research — watchlist
(kookr / ccmux / coslash / herdr-line) + new-entrant sweep (first
since round-168). Authenticated `gh api` throughout.

## Watchlist findings

- **kookr-ai/kookr**: cadence unchanged — pipelineStarvation
  counters surfaced in `kookr status`; collaboration poller now
  rejects cloud-metadata/link-local peer URLs (SSRF-hardening).
  Still no cloud-agent aggregation.
- **epilande/ccmux**: no new pushes since the round-168 relay-skill
  split.
- **centauri-ai/coslash**: no new pushes since 2026-08-06.
- **misty-step/kelpie**: published `VISION.md` — verbatim: "the
  operator console for a fleet of coding agents" and "the operator's
  scarce resource is attention, not terminal windows" (same language
  family as our round-1 positioning). Explicitly single-operator,
  inside the herdr/omp ecosystem, "nothing is built for strangers,
  teams, or a hosted service". Codex desktop named as the polish
  bar.

## New entrant

- **Innovology/claude-dispatcher** (9★): "terminal cockpit for
  running a factory of Claude Code sessions across all your repos" —
  tmux-based, eight keyboard lenses, triage lens for "what wants
  you", Linear/Azure Boards integrations. Claude-only, local-only,
  covers only sessions it dispatches. Filed to the local-cockpit
  cohort; no overlap with cloud aggregation.

Other window hits (skins, skills collections, output styles) out of
scope.

## Verdict

Attention-scarcity language is now the explicit vision statement of
herdr-line competitors; cross-runtime + native-session + cloud
zero-intrusion aggregation remains uncontested. No P2 trigger, no
P0/P1; docs-only, no changeset. `docs/COMPARISON.md` updated with
the batch-12 note.
