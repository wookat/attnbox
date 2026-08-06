# GAP-ROUND-60 — 文档新鲜度走查（rounds 51–59 之后）

Round 60. Driver dimension: docs/UX freshness audit. Pure docs.

## Method

Read every site doc page (`inbox`, `limits`, `doctor`, `hooks`,
`quickstart`, `index`) and repo `docs/LIMITS.md` against actual shipped
behavior as of v0.3.7.

## Drift found and fixed

1. **Grouping section (site `inbox.md`)** — missing rounds 56/59
   behavior: keyboard order following the on-screen group order
   (skipping collapsed groups) and collapse persistence across reloads.
2. **LIMITS (repo + site)** — round-58 pagination boundary was
   undocumented: 1,000-session cap, deep pages ≤ 30 s stale. This is an
   honest-boundary item and belongs in LIMITS.

## Checked, no drift

- Keyboard table (`/ j k Enter e r Esc ?`) matches the shipped handler.
- Theme, waiting-preview, handled-state, finished-collapse, reply,
  notifications, and `--host` sections all match current behavior.
- `doctor`, `hooks`, `quickstart` pages unchanged and accurate.

## P0/P1

None — documentation drift only (P2s fixed here since the diff is
trivial). Site rebuild/deploy needed after merge.
