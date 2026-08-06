---
"attnbox-collectors": patch
---

Devin collector fetches deep session pages in one parallel round-trip instead of sequentially — `attnbox ls` on a 1,000-session org drops from ~5.9s to ~3s.
