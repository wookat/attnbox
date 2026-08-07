# GAP-ROUND-83 — 首次使用黄金路径实测：空态/引导链完整（纯文档）

Round 83. Driver dimension: UX walkthrough — the dogfood inbox always
has 2,800+ sessions, so the *first-run* experience (clean HOME, zero
keys) had not been re-walked since the empty-state work in round-9 and
the doctor additions in rounds 11/75.

## Walked (v0.4.4 from npm, clean HOME, no keys)

- `npx attnbox` starts, web 200, `/api/items` returns a valid empty
  payload.
- Mobile (390×844) empty state: "No one is waiting on you 🎉" summary
  plus an actionable three-step empty card — local agents (just start
  one), cloud agents (restart with `DEVIN_API_KEY=…`/`GITHUB_TOKEN=…`),
  diagnose (`doctor`, `hooks --install`). All commands copy-pasteable
  and correct against the current CLI.
- `attnbox doctor` on the bare machine: all seven lines correct
  (node ✓, four collectors + github-pr + webhook all "–" with the
  right activation hint each).
- `attnbox ls`: "No agent sessions found." + zeroed summary — no
  crash, no confusing output.
- README quickstart commands verified verbatim against the shipped
  0.4.4 behavior; no drift.

## Verdict

No P0/P1: the zero-to-inbox path is coherent — every inactive surface
points at its own activation step. No code change; no changeset.
