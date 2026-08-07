---
"attnbox": patch
---

`attnbox doctor` now validates the GitHub token against the actual review-requested search endpoint instead of `/user` — GitHub App/installation tokens are valid for the collector's search but rejected by `/user`, which made doctor report a false "check token" warning.
