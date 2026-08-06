# GAP-ROUND-38 — 官网文档跟上 rounds 36–37（finished 折叠）

Round 38. Driver dimensions: UX walkthrough (docs freshness audit).

## Audit

Walked every site docs page against current `main` behavior:

- `inbox.md` — missing the rounds 36–37 finished-sessions expander (the only
  user-visible behavior change since the last docs sync); everything else
  (keyboard, previews, handled state, grouping, reply, notifications, phone
  access) still accurate.
- `quickstart.md`, `doctor.md`, `hooks.md`, `limits.md` — verified against
  current CLI output and LIMITS; no drift.

## Fix

Added a "Finished sessions stay out of the way" section to `inbox.md`
documenting the expander and its boundaries (Done tab / search / grouped view
always show everything). Docs-only round; no package changeset.
