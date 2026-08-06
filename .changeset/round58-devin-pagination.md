---
"attnbox-collectors": patch
---

Devin collector now paginates the sessions list (up to 1,000 sessions) instead of silently truncating at the API's first page of 100 — waiting sessions beyond the first page are no longer missed.
