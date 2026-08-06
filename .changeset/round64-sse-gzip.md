---
"attnbox-daemon": patch
---

SSE snapshots and /api/items are gzip-compressed for clients that accept it — measured wire cost at 1,000 sessions drops from ~757 KB/min to ~186 KB/min per open tab.
