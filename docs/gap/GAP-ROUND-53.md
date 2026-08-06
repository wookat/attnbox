# GAP-ROUND-53 — 移动端回复框溢出 + 兜底组命名

Round 53. Driver dimensions: mobile UX walkthrough, visual analysis.

## Evidence sweep（实机 390×844，真实 106 会话）

- Reply box (the only agent-write flow): the placeholder
  "Reply to this agent… (⌘↵ to send, Esc to cancel)" wrapped to 3 lines
  inside a 2-row textarea at 390px — text visibly spilled past the border.
  The ⌘↵ hint is also meaningless on touch (no hardware keys; the Send
  button is the affordance there).
- Grouped view fallback bucket rendered as literally `(devin)` — cryptic
  punctuation-as-semantics, flagged since round-47's walkthrough.

## Classification

- Reply placeholder overflow: P1 — visual defect on the core write flow's
  first paint, on the platform (mobile) we claim first-class.
- `(devin)` label: P2→fixed alongside since it's a one-line render change.

## Fix

- Placeholder shortened to "Reply to this agent…"; the ⌘↵/Ctrl+↵/Esc hint
  moved to the textarea `title` tooltip (desktop-only affordance where it
  applies).
- Fallback group headers render as `devin · no project` (map key
  unchanged, display only).

## Evidence after fix

390×844 re-shoot: placeholder fits inside the box; grouped view shows
`devin · no project` as the last group. 85 tests green.

## Honest boundary

Tooltip hints are invisible on touch — mobile users rely on the Send
button, which is the intended affordance.
