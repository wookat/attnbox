# GAP-ROUND-16 — production benchmark loop, round 16

Date: 2026-08-05. Reference: **round 14's own standard extended to local agents** — Devin waiting items now say what's being asked; Claude Code and Codex waiting items still showed only the title, so an approval request meant switching to the terminal just to see *what* wants approval (ccmux shows the pane content for exactly this reason).

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | ccmux: jumping to a session shows what it's asking; round-14 Devin items carry `detail` | Claude/Codex waiting items: title only | **P1** |

## Round-16 fix

Both from the same read-only files the collectors already parse — no new I/O:

- **Claude Code**: waiting items (heuristic tool_use tail or hook-driven) preview the last assistant text block (whitespace-collapsed, 280-char cap) — typically the sentence explaining what it's about to do.
- **Codex**: approval-request items preview the pending action: `wants to run: <command…>` from `exec_approval_request.command`, or `wants to apply a patch`.

Honest boundary: these previews are transcript-derived like the statuses themselves; hook payloads carry no question text, so a hook-authoritative waiting item still previews the latest transcript text.

## Evidence

78 tests green (new: Claude last-assistant-text preview; Codex exec/patch approval previews). Rendering paths (web `line-clamp-2`, `ls` `└` line) unchanged from round 14 and already covered.

## Regression verdict

All three agents that can wait on you now say what for, at a glance. Carried gaps unchanged (macOS, Cursor/Copilot, GEMINI_API_KEY, heuristic misjudgment quantification).
