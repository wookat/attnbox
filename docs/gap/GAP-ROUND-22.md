# GAP-ROUND-22 — production benchmark loop, round 22

Date: 2026-08-05. Competitor re-benchmark: fresh clone of **ccmux** (epilande/ccmux, HEAD `616126e`), 84 commits since July — our direct competitor is iterating fast. Source-level review of what landed and what transfers to attnbox.

## What ccmux shipped since our round-1 review

- **Nine built-in agents** (was ~4): added Cursor CLI, OpenCode, Pi/omp, Antigravity, Copilot CLI — each via that agent's *native* hook/plugin/extension system, marker files, no log scraping where avoidable
- Worktree management (spawn/fork/move/prune), session handoff, transcript readers (`ccmux last`), actionable desktop notifications with Approve/Deny/Reply

## What transfers to attnbox (and what doesn't)

| ccmux capability | Transfers? | Why |
|---|---|---|
| Cursor CLI native hooks (`~/.cursor/hooks.json`, ≥ 2026.1.16: `sessionStart`/`sessionEnd`/`beforeSubmitPrompt`/`stop`) | **Yes — the headline finding.** Local Cursor sessions can get authoritative working/idle with *no API key*, sidestepping our blocked Cursor-cloud gap for the local case | our Claude/Codex hooks pattern extends naturally |
| Copilot CLI local tracking | Partially — same native-hook approach, needs `copilot` CLI to verify | |
| Worktree/handoff/tmux act-in-place | No — tmux-bound by design; attnbox deliberately doesn't wrap terminals | positioning unchanged |
| Actionable OS notifications (Approve/Deny from the notification) | Future candidate — attnbox notifications are browser-side; acting requires the daemon's act-in-place surface, which only Devin has today | P2 |

## Gap list

| # | Gap | Priority |
|---|---|---|
| 1 | Local Cursor CLI collector via native hooks — no credentials needed; blocked only on a live `cursor-agent` for end-to-end verification (schema is documented and verified against a shipping integration) | P1, next implementation round once verifiable |
| 2 | Releasing procedure risk: plain `npm publish` would ship `workspace:*` ranges (AgentGate 0.6.0 incident) — CONTRIBUTING now prescribes `pnpm pack` + `npm publish <tarball>` | P0 doc fix, this round |

## Round-22 changes

Docs only: CONTRIBUTING Releasing corrected; LIMITS gains an honest Cursor-CLI-local row (planned, schema-verified, not live-verified).

## Regression verdict

Differentiation holds (cloud agents + mobile + no tmux), but ccmux's local-agent breadth is now clearly ahead; local Cursor CLI support is the highest-value catch-up that needs no external resources beyond installing `cursor-agent`.
