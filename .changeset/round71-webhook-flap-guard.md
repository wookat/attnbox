---
"attnbox-daemon": patch
---

The waiting webhook no longer re-fires every waiting item after a collector outage: an item leaves the "already notified" set only when observed in a non-waiting status, not when it is merely absent from a collection pass.
