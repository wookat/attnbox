# GAP-ROUND-108 — SSE 断线/自动重连恢复实测（纯文档）

Round 108. Driver dimension: real testing — the round-9 disconnect
banner and EventSource auto-reconnect had never been re-probed as one
kill → restart → recover sequence on current code.

## Probed (live inbox, open tab, daemon killed and restarted underneath)

1. Steady state: header pill `live`.
2. `kill` the daemon with the tab open → within seconds the pill
   flips to `offline` and the disconnect messaging appears; the list
   keeps rendering the last known items (no blank screen, no crash).
3. Restart the daemon on the same port → the tab recovers to `live`
   **without a manual refresh** (EventSource retry), resuming with
   the current waiting count (14) from the fresh process.

## Verdict

No P0/P1: the disconnect → recover loop is fully automatic and
truthful at each stage. Docs-only; no changeset.
