# GAP-ROUND-95 — 官网 Lighthouse 复审 + daemon 短程 soak（纯文档）

Round 95. Driver dimensions: frontend visual/performance (docs site,
untouched by audits since round-49) + runtime health after 0.4.5.

## Site audit (production, 2026-08-07)

Lighthouse (headless, mobile defaults) on the live site:

| Page | perf | a11y | best-practices | seo |
|---|---|---|---|---|
| attnbox.zalize.com/ | 100 | 100 | 100 | 100 |
| /quickstart/ | 100 | 100 | 100 | 100 |

Round-49's perf 94 has drifted *up* to straight 100s (Starlight +
static Pages hosting), including the round-91 limits-page edit.

## Daemon soak (live inbox, ~2,900 sessions)

0.4.5-equivalent build, 4-minute steady-state watch: RSS flat at
~3.4 MB (parent process), zero errors/4xx in the daemon log across
the full-crawl cycles.

## Verdict

No P0/P1 anywhere on the site or runtime surface. Docs-only; no
changeset.
