# GAP-ROUND-39 — `attnbox ls` 默认隐藏 finished（与收件箱信噪比一致）

Round 39. Driver dimensions: UX walkthrough (CLI), dogfood data analysis.

## Evidence

Same real dogfood dataset that drove rounds 36–37: 106 sessions, 89 finished
(done + idle). `attnbox ls` printed **114 lines**, of which finished history
was the bulk — the 6 waiting lines at the top scroll away in any short
terminal. Round-36 had recorded "ls stays full listing" as a non-goal; the
web-side fix landing (and being validated in daily use) makes the CLI the
last surface still drowning in finished history.

## Fix (P1)

`attnbox ls` now hides finished sessions (`done`/`idle`) by default and
prints an honest trailing line:

```
… 89 finished sessions hidden — `attnbox ls --all` to show
```

- `--all` restores the full listing;
- `--waiting` unchanged;
- `--json` deliberately stays **full** output (machine consumers must not
  silently lose data);
- summary line still counts the full dataset (`106 total`).

Verified live: default 25 lines + hidden note; `--all` 114 lines;
`--json` 106 items.

## Also checked this round

- `/api/reply` negative-path review: already hardened (501 no handler /
  413 oversize / 400 bad JSON or shape / 502 upstream) — no gap.
- Web empty states: search-no-match vs onboarding empty state both present —
  no gap.
