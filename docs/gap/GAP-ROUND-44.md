# GAP-ROUND-44 — 官网文档跟上 rounds 41–43（主题 + ? 帮助）

Round 44. Driver dimensions: UX walkthrough (docs freshness), user/data
analysis.

## Gap (P1, docs)

The site's *Using the inbox* page still described a dark-only,
help-overlay-less inbox: rounds 41–43 shipped the light theme, the system
theme following, the manual ◐ toggle, and the `?` shortcut overlay, none of
which were documented. Docs drift is a recurring failure mode we check every
few rounds (same as round-38).

## Fix

`apps/site/src/content/docs/inbox.md`:

- keyboard table gains the `?` row + a pointer to the in-app cheat sheet;
- new **Theme** section: follows `prefers-color-scheme` by default, both
  palettes WCAG AA, ◐ header button cycles system → light → dark per
  browser, persists with no flash.

Rest of the page audited against current behavior — no other drift found.

## Release note

Changesets now at 3 accumulated `attnbox` patches (rounds 41/42/43 — the
complete theme + discoverability story). Suggested: cut 0.3.4 after this
merge.

## Honest boundary

Docs only; site redeploy happens after merge.
