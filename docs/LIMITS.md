# Capability boundaries (honest edition)

attnbox derives "who is waiting on you" from different signals per source. Some are authoritative, some are heuristics. This page states exactly what you can and cannot trust.

| Source | Discovery | Waiting signal | Confidence | Notes |
|---|---|---|---|---|
| Claude Code | `~/.claude/projects/**/*.jsonl` (read-only) | transcript tail: unresolved `tool_use` → waiting/approve | **heuristic** by default, **authoritative** with hooks | Run `attnbox hooks` and merge the snippet into `~/.claude/settings.json`; Claude's own `Notification`/`Stop`/`UserPromptSubmit` hooks then drive status. Stale `working` capped to `idle` after 5 min. |
| Codex CLI | `~/.codex/sessions/**/rollout-*.jsonl` (read-only) | `event_msg` lifecycle + unresolved approval requests | **heuristic** by default, **authoritative** with hooks | Run `attnbox hooks`. Preferred: `~/.codex/hooks.json` + `[features] codex_hooks = true` — `PermissionRequest` gives authoritative *waiting/approve*, `Stop` gives idle. Fallback: the `notify` line in `~/.codex/config.toml` (turn-complete/idle only). Log format is vendor-internal and may drift between Codex versions. |
| Devin | `GET api.devin.ai/v1/sessions` | `status_enum === "blocked"` | **authoritative** | Requires `DEVIN_API_KEY`. Act-in-place: waiting items can be replied to from the inbox (`↩`/`r`), sent via `POST api.devin.ai/v1/session/{id}/message` — the only write attnbox ever performs, and only at your explicit action. |
| Gemini CLI | `~/.gemini/tmp/**` + `projects.json` (read-only) | none — no waiting marker exists in local files | **heuristic** | Reports working/idle only from file activity; never claims waiting. |
| Cursor Cloud Agents | planned | run status via public API | — | Not yet implemented: no API key available to us for verification. Interface reserved in `attnbox-collectors`; the review-requested fallback above applies meanwhile. |
| Cursor CLI (local, `cursor-agent`) | planned | native hooks (`~/.cursor/hooks.json`, `cursor-agent` ≥ 2026.1.16) | — | Cursor's local CLI exposes lifecycle hooks (`sessionStart`/`sessionEnd`/`beforeSubmitPrompt`/`stop`), which would give authoritative working/idle without any API key — verified against Cursor's hook schema and a shipping integration (ccmux), not yet against a live `cursor-agent` (none installed here). No tool-approval hook event, so waiting/approve would stay heuristic. |
| GitHub review-requested (fallback) | `GET api.github.com/search/issues` `review-requested:@me` | open PR awaiting your review → waiting/review | **authoritative** | Requires `GITHUB_TOKEN`/`ATTNBOX_GITHUB_TOKEN`. Covers Copilot coding agent, Cursor agents and human teammates alike at the PR boundary. Bad tokens (401/403) warn on stderr and `attnbox doctor` live-probes the token — never silent data loss. |
| GitHub Copilot coding agent (native) | planned | task `state === "waiting_for_user"` | — | Requires Copilot Business/Enterprise, which we do not have; the review-requested fallback above applies meanwhile. |

General rules:

- Local collectors never write to agent directories and never spawn or wrap agent processes.
- A collector failure (missing dir, network error, malformed line) degrades to "no items from that source", never a crash.
- Heuristic items are marked `~heuristic` in the UI.
- Notifications fire only while the inbox is open somewhere (a tab or the installed PWA, foreground or background). There is deliberately **no push server**: Web Push would require relaying your agent activity through a third-party push service, which contradicts local-first. If nothing has the inbox open, nothing notifies — the items are still waiting when you return.
