# Capability boundaries (honest edition)

attnbox derives "who is waiting on you" from different signals per source. Some are authoritative, some are heuristics. This page states exactly what you can and cannot trust.

| Source | Discovery | Waiting signal | Confidence | Notes |
|---|---|---|---|---|
| Claude Code | `~/.claude/projects/**/*.jsonl` (read-only) | transcript tail: unresolved `tool_use` → waiting/approve | **heuristic** by default, **authoritative** with hooks | Run `attnbox hooks` and merge the snippet into `~/.claude/settings.json`; Claude's own `Notification`/`Stop`/`UserPromptSubmit` hooks then drive status. Stale `working` capped to `idle` after 5 min. |
| Codex CLI | `~/.codex/sessions/**/rollout-*.jsonl` (read-only) | `event_msg` lifecycle + unresolved approval requests | **heuristic** by default, **authoritative** turn-complete with notify hook | Run `attnbox hooks` and add the `notify` line to `~/.codex/config.toml`; Codex then reports turn completion itself. Log format is vendor-internal and may drift between Codex versions. |
| Devin | `GET api.devin.ai/v1/sessions` | `status_enum === "blocked"` | **authoritative** | Requires `DEVIN_API_KEY`. |
| Gemini CLI | `~/.gemini/tmp/**` + `projects.json` (read-only) | none — no waiting marker exists in local files | **heuristic** | Reports working/idle only from file activity; never claims waiting. |
| Cursor Cloud Agents | planned | run status via public API | — | Not yet implemented: no API key available to us for verification. Interface reserved in `attnbox-collectors`; the review-requested fallback above applies meanwhile. |
| GitHub review-requested (fallback) | `GET api.github.com/search/issues` `review-requested:@me` | open PR awaiting your review → waiting/review | **authoritative** | Requires `GITHUB_TOKEN`/`ATTNBOX_GITHUB_TOKEN`. Covers Copilot coding agent, Cursor agents and human teammates alike at the PR boundary. |
| GitHub Copilot coding agent (native) | planned | task `state === "waiting_for_user"` | — | Requires Copilot Business/Enterprise, which we do not have; the review-requested fallback above applies meanwhile. |

General rules:

- Local collectors never write to agent directories and never spawn or wrap agent processes.
- A collector failure (missing dir, network error, malformed line) degrades to "no items from that source", never a crash.
- Heuristic items are marked `~heuristic` in the UI.
