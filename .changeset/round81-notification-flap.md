---
"attnbox": patch
---

Web inbox: browser notifications no longer re-fire for every waiting item after a collector blip — an item only leaves the notified set when observed non-waiting (same guard the daemon webhook got in 0.3.1), and pre-existing waiting items never notify on startup.
