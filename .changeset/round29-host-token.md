---
"attnbox": minor
"attnbox-daemon": minor
---

`attnbox --host <addr>` (env `ATTNBOX_HOST`) opens the inbox to other devices — e.g. install the PWA on your phone. Non-loopback binds refuse to start without `ATTNBOX_TOKEN`; every `/api/*` request then requires the token (Bearer header or `?token=`), which the web UI picks up once from `/?token=<token>` and persists. The daemon gains a `token` option enforcing this.
