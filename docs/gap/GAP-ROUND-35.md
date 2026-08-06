# GAP-ROUND-35 — 官网首次 Lighthouse 审计：accent 对比度违规修复

Round 35. Driver dimensions: real testing (first-ever Lighthouse audit of the
public site), frontend visual analysis, accessibility.

## Evidence

Lighthouse 13.4.1, mobile emulation, against the deployed site:

| URL | perf | a11y | best-practices | seo |
| --- | --- | --- | --- | --- |
| attnbox.zalize.com/ | 99 | 96 | 96 | 100 |
| attnbox.zalize.com/inbox/ | 100 | 96 | 96 | 100 |

CLS 0 and LCP 1.5–1.7s on both — the static site itself is healthy.

## P1 — site accent color fails WCAG AA contrast

The Starlight accent (`--sl-color-accent: #d97706`, amber-600) renders the
site title and accent text at **2.97:1** against the dark background (needs
4.5:1). Same class of violation we fixed in the web inbox in round-18, but the
docs site was never audited.

Fix in `apps/site/src/styles/custom.css`: dark accent → `#f59e0b` (amber-500,
≥4.5:1 on Starlight dark bg); added an explicit light-theme override
(`#b45309`, amber-700, 4.7:1 on white) since a shared `:root` accent can't
satisfy both themes. Rebuilt site re-audited locally: **a11y 100, 0
color-contrast violations**.

## Non-issues recorded

- `errors-in-console` (ERR_BLOCKED_BY_CLIENT) on the deployed site comes from
  the auditing browser's content blocker, not the site — no third-party
  scripts are loaded by the site itself.
- The best-practices deduction traces to the same blocked-request artifact.
