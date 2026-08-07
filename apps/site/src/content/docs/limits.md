---
title: Sources & honest limits
description: Exactly what you can and cannot trust, per source.
---

attnbox derives "who is waiting on you" from different signals per source. Some are authoritative, some are heuristics. Every item in the inbox is tagged with its confidence.

| Source | Discovery | Waiting signal | Confidence |
|---|---|---|---|
| Claude Code | `~/.claude/projects/**/*.jsonl` (read-only) | transcript tail: unresolved `tool_use` → waiting/approve | **heuristic**, **authoritative** with [hooks](/hooks/) |
| Codex CLI | `~/.codex/sessions/**/rollout-*.jsonl` (read-only) | lifecycle events + unresolved approval requests | **heuristic**, **authoritative** waiting/approve with [hooks.json](/hooks/) (notify fallback: turn-complete only) |
| Devin | `api.devin.ai/v1/sessions` | `status_enum === "blocked"` | **authoritative** — supports [reply in place](/inbox/#reply-in-place-cloud-agents) |
| Gemini CLI | `~/.gemini/tmp/**` (read-only) | none — reports working/idle only, never claims waiting | **heuristic** |
| GitHub review-requested | `search/issues` `review-requested:@me` | open PR awaiting your review | **authoritative** |
| Cursor Cloud Agents | planned | run status via public API | — |
| Copilot coding agent (native) | planned | `state === "waiting_for_user"` (Business/Enterprise only) | — |

The GitHub review-requested fallback covers Copilot coding agent, Cursor agents and human teammates alike at the PR boundary, without needing their native APIs.

General rules:

- Local collectors never write to agent directories and never spawn or wrap agent processes.
- The only write attnbox performs is the explicit Devin reply action; there is no other outbound write anywhere.
- A `working` item with no activity for 5 minutes is capped to `idle` (heuristic staleness guard, local collectors only). Cloud statuses are passed through as the vendor reports them — a Devin session can legitimately stay `working` for hours (e.g. an orchestrator supervising child sessions).
- Cloud collectors fail soft: an unreachable API never breaks the rest of the inbox.
- The Devin sessions list is crawled until the backlog is exhausted (hard safety cap 10,000 sessions); deeper pages refresh at most every 30 s, so changes on old sessions can lag up to 30 s. Waiting-item question previews are fetched for every blocked session in one pass (bounded to 10 parallel requests, cached by update time), so `attnbox ls` and the inbox always show what each waiting session is asking, regardless of how many are blocked.
- The web UI receives full-state SSE snapshots, gzip-compressed when the browser accepts it (~186 KB/min per open tab at 1,000 sessions). Since v0.4.8 the bundled UI subscribes with `?slim=1`: done sessions are omitted from every event and fetched lazily when a view first needs them, so the offline cached snapshot covers active sessions only — the Done tab and search over finished sessions need the daemon reachable.
- Notifications fire only while the inbox is open somewhere (a tab or the installed PWA). There is deliberately **no push server** — Web Push would relay your agent activity through a third-party push service, which contradicts local-first. If nothing has the inbox open, nothing notifies; the items are still waiting when you return.

The canonical, always-current version of this table lives in [docs/LIMITS.md](https://github.com/wookat/attnbox/blob/main/docs/LIMITS.md).
