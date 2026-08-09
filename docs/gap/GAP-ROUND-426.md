# GAP-ROUND-426 — 竞品第三十五批扫描（纯文档）

Round 426. Driver dimension: competitor watch, first since
round-415. Named watchlist checked repo-by-repo (authed API,
commits + descriptions), plus three-way new-entrant scans.

## Watchlist findings

- **claude-dispatcher** (Innovology, 9★) — again the most
  active local rival: dispatch branches cut from default
  branch w/ one live dispatch per feature, Products lens
  polish, version nag, model-family usage split, cockpit
  repo→product assignment. Still Claude-only tmux cockpit,
  covers only sessions it dispatches, no cloud aggregation.
- **kookr** — high velocity continues (starvation counters
  in status, cloud-metadata/link-local peer URL rejection,
  quota headroom tuning). Local router, no cloud.
- **ccmux** — v1.3.0 shipped; now docs/README polish +
  relay-skill trigger broadening only. tmux-local.
- **agent-inbox** (shariqh) — trusted-origin viewer
  mutation hardening + startup migration serialization,
  then quiet since 8/7. Still pure local MCP+SQLite.
- **agentfleet** (beknazar) — "report what a machine is
  actually doing, not what a timer implies" — real-machine
  truthful activity reporting deepens; closest multi-machine
  local play, no waiting semantics.
- **trail-boss** — ADR-1 systemd user service + license +
  daemon-unreachable vs empty-queue distinction. Early.
- **jind-ai** — pane identity / adapter setup-state fixes;
  ccmux quadrant.
- **duty-on** — v1.1.6/1.1.7: Codex/OpenCode support +
  thinking/tool-use sub-states + external display + Trae CN
  title compat. Ambient IDE pet, still no triage/action
  links/cloud.
- **HumanLoop** (Revolper) — device pairing + Cursor
  approval bridge + binding-scoped alerts. Approvals-only,
  no waiting-status surface yet; keep on archive watch.
- **coslash / kelpie** — v0.0.1 README wrap / steady herdr
  ecosystem work respectively.

## New entrants

Only **philontos/switchyard** — dispatch Claude Code agents
into isolated git worktrees + tmux and drive them from one
screen. Dispatcher quadrant (like claude-dispatcher), not an
attention inbox; archive-observe.

Three-way scans ("which agent is waiting" / notification
inbox / attention router): no new direct competitor; our
unified local+cloud waiting-reason inbox remains unmatched.

## Verdict

Differentiation unchanged. No P0/P1; docs-only, no
changeset.
