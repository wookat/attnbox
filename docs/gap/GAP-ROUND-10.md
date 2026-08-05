# GAP-ROUND-10 — production benchmark loop, round 10

Date: 2026-08-05. Reference: **inboxes at real scale** — Linear and GitHub notifications stay smooth with thousands of items. Round 3 measured collectors at 10× scale (1,000 sessions → 34 ms collect); the web UI and SSE path had never been measured at that scale. This round measures the full pipeline against a synthesized 1,000-session Codex fixture (`/tmp/gen1000.mjs`-style: 1,000 rollouts, 25 projects, 334 authoritative-style approval waits).

## Measurements (Node 22, Chromium via Playwright, 1280×900)

| Metric | Result | Reference bar |
|---|---|---|
| `/api/items` payload, 1,000 items | 261 KB JSON | — (sent only on change: daemon diffs snapshots before broadcasting) |
| First render (navigate → rows painted) | **237 ms** | Linear-class: <1 s |
| Rendered rows | 1,000 (no virtualization) | — |
| Search typing latency (19 chars, live filter over 1,000 items) | **~11 ms/keystroke** | <16 ms frame budget |
| Keyboard nav `j` ×20 (with scroll-into-view) | **~14 ms/press** | <16 ms |
| JS heap after render | 38 MB | — |

## Gap list

| # | Reference does | attnbox at 1,000 sessions | Priority |
|---|---|---|---|
| 1 | Smooth first paint | 237 ms — fine | none |
| 2 | Responsive filter/search | ~11 ms/keystroke — fine | none |
| 3 | Virtualized/paginated lists | full render; smooth at 1,000, untested ≥10,000 | P2 (revisit if real inboxes approach 10k) |
| 4 | Broadcast efficiency | SSE only fires on snapshot change (`refresh()` diff) — already efficient | none |

## Verdict

No P0/P1 at 10× real-world scale; numbers recorded in `docs/MATURITY.md`. Virtualization deliberately deferred (P2) — honest note kept rather than speculative complexity. Remaining carried gaps: macOS verification, Cursor/Copilot credentials, Gemini authoritative waiting (no `GEMINI_API_KEY` available to exercise a real session; local files carry no waiting marker — unchanged honest boundary).
