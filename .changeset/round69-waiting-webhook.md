---
"attnbox-daemon": minor
"attnbox": minor
---

New waiting webhook: set `ATTNBOX_WEBHOOK_URL` and the daemon POSTs `{ event: "waiting", item }` each time an agent newly starts waiting on you — the extension point for Slack/ntfy/自动化 without a push server. Fire-and-forget: webhook failures never affect the inbox, and items already waiting at startup don't fire.
