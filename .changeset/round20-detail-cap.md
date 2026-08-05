---
"attnbox-collectors": patch
---

Devin detail previews: cap uncached `GET /session/{id}` lookups at 10 per collect cycle; remaining blocked sessions catch up on later cycles. Bounds cold-start/burst API cost regardless of workspace size.
