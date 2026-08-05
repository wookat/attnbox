# GAP-ROUND-28 — production benchmark loop, round 28

Date: 2026-08-05. Regression round after the rounds 25–27 changes (bulk triage button, notification actions, ack validation) landed and v0.2.1 shipped.

## Accessibility re-audit

Round-18 established the axe-core WCAG bar (0 violations after fixing ~220 serious color-contrast nodes). Re-ran axe-core against the current build on the live daemon (real 104-session workspace):

- desktop 1280×800: **0 violations**
- mobile 390×844: **0 violations**

The round-25 "✓ all done" button and header changes introduced no regressions.

## Live regression

- `/api/items`: 104 sessions, 12 waiting, 16 working — collectors healthy post-hardening.
- Round-27 validation re-confirmed on the rebuilt main (404/400/413 paths).

## Conclusion

No P0/P1 found this round; recorded as evidence, no product change. Next feature-sized work is blocked on external resources (Cursor login — requested; Gemini key; Copilot access; macOS). The loop continues on new evidence: real-use findings, competitor movement, or resource arrival.

## Carried gaps

Unchanged: Gemini key; Cursor login; Copilot; macOS; heuristic FP/FN quantification.
