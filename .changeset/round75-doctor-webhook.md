---
"attnbox": patch
---

`attnbox doctor` now reports the waiting-webhook channel: off when `ATTNBOX_WEBHOOK_URL` is unset, the target origin+path when configured, and a warning when the value is not a valid URL (which would make every post silently fail).
