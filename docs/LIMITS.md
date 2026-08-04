# Capability boundaries (honest edition)

attnbox derives "who is waiting on you" from different signals per source. Some are authoritative, some are heuristics. This page states exactly what you can and cannot trust.

| Source | Discovery | Waiting signal | Confidence | Notes |
|---|---|---|---|---|
| Claude Code | `~/.claude/projects/**/*.jsonl` (read-only) | transcript tail: unresolved `tool_use` → waiting/approve | **heuristic** | Hook-based authoritative mode planned (M2). Stale `working` capped to `idle` after 5 min. |
| Codex CLI | `~/.codex/sessions/**/rollout-*.jsonl` (read-only) | `event_msg` lifecycle + unresolved approval requests | **heuristic** | Log format is vendor-internal and may drift between Codex versions. |
| Devin | `GET api.devin.ai/v1/sessions` | `status_enum === "blocked"` | **authoritative** | Requires `DEVIN_API_KEY`. |
| Gemini CLI | planned (M2) | weak — no clear waiting marker in local files | — | Will ship as working/idle only, clearly labeled. |
| Cursor Cloud Agents | planned (M2) | run status via public API | — | Not yet implemented: no API key available to us for verification. Interface reserved in `@attnbox/collectors`. |
| GitHub Copilot coding agent | planned (M2) | task `state === "waiting_for_user"` | — | Requires Copilot Business/Enterprise. Fallback: PRs where your review is requested. |

General rules:

- Local collectors never write to agent directories and never spawn or wrap agent processes.
- A collector failure (missing dir, network error, malformed line) degrades to "no items from that source", never a crash.
- Heuristic items are marked `~heuristic` in the UI.
