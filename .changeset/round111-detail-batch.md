---
"attnbox-collectors": patch
---

Devin waiting details are now fetched for every waiting session in one collect (in bounded parallel batches of 10) instead of capping at 10 per cycle — one-shot `attnbox ls` no longer shows waiting items without their question when more than 10 sessions are blocked.
