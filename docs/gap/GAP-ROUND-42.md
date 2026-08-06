# GAP-ROUND-42 — 键盘快捷键可发现性（? 帮助面板）

Round 42. Driver dimensions: UX walkthrough, competitor comparison, dogfood
data analysis.

## Evidence sweep

- Competitor recon: ccmux HEAD unchanged since round-41 (`380b6b2` top);
  Omnigent still 0.8.2 (`uv tool upgrade` → "Nothing to upgrade"). No new
  external movement this round.
- Dogfood (live, 106 sessions): 9 waiting / 8 working / 6 idle / 83 done,
  all waiting items fresh (<1h) with detail previews — collector pipeline
  healthy, no staleness problem to fix.
- UX walkthrough of the keyboard flow: the inbox has **7 shortcuts**
  (`/`, `j`/`k`, `Enter`, `e`, `r`, `Esc`) and **zero discoverability** —
  no help overlay, no hints anywhere in the UI. `e` (ack) and `r` (reply)
  are effectively invisible features unless you read the source.

## Gap (P1)

Every keyboard-first inbox we benchmark against — Linear, GitHub, Gmail,
Superhuman — binds `?` to a shortcut-help overlay. Ours silently ignored
`?`. For a product whose triage loop is explicitly keyboard-driven
(j/k → e/r), undiscoverable shortcuts means most users triage by mouse.

## Fix

- `?` toggles an accessible help dialog (`role="dialog"` `aria-modal`,
  click-outside and `Esc` close, light/dark themed, `<kbd>` rows);
- desktop footer gains a "press ? for shortcuts" entry point (hidden on
  mobile, where the shortcuts don't apply).

## Evidence after fix

- Programmatic walkthrough: `?` opens, `Esc`/outside-click closes, list
  matches the actual bindings; axe on the open dialog: 0 violations both
  themes.

## Honest boundary

No shortcut for filter-tab switching or "ack all" yet — added to the help
only what exists. Inline per-row kbd hints (Superhuman-style) are a P2.
