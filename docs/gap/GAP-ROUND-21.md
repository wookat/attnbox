# GAP-ROUND-21 — production benchmark loop, round 21

Date: 2026-08-05. Dogfood regression round: real daemon over the live 104-session workspace (9 waiting / 11 working at test time), post-v0.2.0, exercised on desktop and a 390×844 mobile viewport.

## What was exercised

- Needs-you view: waiting cards with detail previews, ack (✓/e), reply (↩/r), open (↗)
- Working / Done tabs, project grouping toggle, search (`/`)
- Mobile: title truncation, tap targets, safe-area, detail clamp
- Live SSE reconnect banner not triggered (daemon stayed healthy)

## Measurements

- Search filter keystroke → filtered list: ~44 ms for a 104-item workspace
- Detail previews present on 13/13 waiting Devin sessions within two collect cycles (round-20 cap working as designed)

## Findings

No P0/P1 found this round. Not manufacturing work: the inbox held up under real use on both form factors. Remaining known gaps are all externally blocked or need long-horizon data:

| Gap | Blocked on |
|---|---|
| Gemini authoritative waiting | `GEMINI_API_KEY` |
| Cursor / Copilot native collectors | credentials / subscription |
| macOS verification | macOS machine |
| Local heuristic FP/FN quantification | a real multi-session local work period |
| npm page README rendering | next release via per-package `npm publish` (see CONTRIBUTING → Releasing) |

## Regression verdict

Experience parity check vs ccmux/agent-dashboard remains favorable on the differentiated axis (cloud agents, mobile, detail previews); tmux act-in-place remains deliberately out of scope.
