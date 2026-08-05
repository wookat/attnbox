# GAP-ROUND-1 — production benchmark loop, round 1

Date: 2026-08-05. References: **ccmux v1.2.2** (direct competitor, installed from source and run against a real tmux + Claude session), **Linear / Superhuman inbox UX** (keyboard-first triage model), **GitHub notifications inbox** (filter/done model). Dogfood: attnbox daemon run against real local `~/.claude`/`~/.codex`/`~/.gemini` data + live Devin API (103 sessions, 11 waiting).

## Evidence log

- ccmux: `bun install && bun link` from https://github.com/epilande/ccmux, `ccmux setup`, `ccmux status`, `ccmux picker --persistent` in tmux, captured picker output (project-grouped rows, `j/k nav · enter switch · / search · b group:project`). Deep agent-state testing was limited because interactive Claude required login on this machine; picker/daemon/hook-setup behavior was still fully observed.
- ccmux `setup` installs **Codex hooks via `~/.codex/hooks.json`** (`SessionStart`/`Stop`/`PermissionRequest` + `[features] codex_hooks` in config.toml). Verified against openai/codex source (`codex-rs/hooks/src/events/*`): payloads carry `hook_event_name` + `session_id`, same shape as Claude hooks — including **`PermissionRequest`, an authoritative "waiting for approval" signal we don't consume**.
- attnbox dogfood: `node packages/cli/dist/index.js ls` on real data → 103 sessions in 0.21s (`time`, real). Web inbox live over SSE, desktop + 390×844 mobile screenshots captured; title count and filters work.

## Gap list

| # | Competitor does | attnbox today | Gap | Priority |
|---|---|---|---|---|
| 1 | ccmux gets authoritative Codex waiting-for-approval via hooks.json `PermissionRequest`; Stop → idle | Codex `notify` hook only reports turn-complete (idle); *waiting/approve* still comes from rollout-log heuristics | Missed/late approval detection for Codex — the single most valuable signal | **P0** |
| 2 | Linear/Superhuman/ccmux are keyboard-first: j/k navigation, enter to open, / to search | Web inbox is mouse/touch only; no keyboard navigation, no search | Desktop triage speed; 103 sessions with no text filter is painful | **P0** |
| 3 | ccmux `show --json`; GitHub API scriptability | `attnbox ls` has no `--json`/`--waiting`; not scriptable, done-sessions clutter | Automation/scripting entry point missing | P1 |
| 4 | ccmux groups sessions by project with collapsible groups | Flat list; project shown per-card only | Grouping (by project or agent) for large inboxes | P1 (round 2) |
| 5 | GitHub notifications has "mark done"/read-state; Superhuman has triage | No read/dismiss model; an ignored waiting item stays highlighted forever | Attention hygiene for long-running inboxes | P1 (round 2) |
| 6 | ccmux can act in place (approve/deny from notification/preview) | attnbox links out (cloud) or shows only (local) | Local act-in-place is out of scope by design (no tmux dependency) — document honestly; cloud actions possible later | P2 |
| 7 | — | one Devin session shows status `unknown` in UI | Map unknown Devin `status_enum`s more gracefully | P1 |

## Round-1 fixes (this round)

- **P0-1**: consume Codex hooks.json events (`PermissionRequest` → waiting/approve, `Stop`/`SubagentStop` → idle, `UserPromptSubmit`/`PreToolUse`/`PostToolUse` → working) through the existing `attnbox hook codex` command; `attnbox hooks` prints the `~/.codex/hooks.json` + `[features] codex_hooks` snippet alongside the legacy `notify` line.
- **P0-2**: web inbox keyboard flow (j/k/arrows to move, Enter to open, `/` to focus search, Esc to clear) + text search across title/project/agent.
- **P1-3**: `attnbox ls --json` and `attnbox ls --waiting`.

## Regression verdict

Re-run as a user on real data (103 sessions, 14–15 waiting): `attnbox ls --waiting --json` works for scripting; `/`-search + j/k/Enter make desktop triage comparable to ccmux's picker for the "find and jump" flow; Codex `PermissionRequest` now lands as authoritative *waiting/approve* (verified end-to-end via `attnbox hook codex` stdin smoke + collector tests). Honest remaining shortfalls vs the references: no project grouping, no read/dismiss triage model, no act-in-place for local agents (by design — no tmux dependency). Grouping + attention hygiene are the round-2 targets.
