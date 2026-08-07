# GAP-ROUND-119 — 官网 Lighthouse 复测：light 主题内联代码对比度修复（P1 已修）

Round 119. Driver dimension: site visual/perf re-audit — first
Lighthouse pass on the live site since round-95.

## Found

- Home: 100/100/100/100 (perf/a11y/bp/seo) — round-95 scores hold.
- quickstart/inbox/limits: a11y 100.
- **doctor: a11y 97 — P1 (fixed)**: light-theme accent `#b45309`
  (amber-700, chosen in round-35 against *white*) sits at **4.33:1**
  on the `#edeef3` inline-code background that Starlight renders
  around `<code>` spans. Doctor has the densest inline-code usage, so
  only that page tripped. Darkened the light accent to `#a54c08`
  (4.98:1 on `#edeef3`, 5.77:1 on white); dark theme untouched.
- Remaining `label-content-name-mismatch` on Starlight's built-in
  search button (visible "Ctrl K" hint not in the accessible name) is
  an upstream component issue, does not affect the score (100
  post-fix), and is left to Starlight.

## Verification

Local rebuild + axe (light) on doctor/limits/inbox: 0 violations;
Lighthouse a11y on doctor: 97 → 100. Deploy after merge.

## Verdict

One P1 fixed in `apps/site` (site-only — no npm package changed, no
changeset).
