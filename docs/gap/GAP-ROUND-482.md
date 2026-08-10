# GAP-ROUND-482 — 分诊全流程 UX 走查（纯文档）

Round 482. Driver dimension: full triage-flow UX
re-walk (search → filter → ack all → reverse ack +
keyboard chain), first since round-471. Probe
daemon on port 4992, clean localStorage, live data.

## Evidence (v0.4.8, main, ~3,930 sessions —
largest scale yet)

```text
default view      → 73 cards · 0 full /api/items
                    fetches after initial load
lazy search       → "devin" exactly 1 fetch,
                    3,930 hits
negative search   → honest empty state (0 cards,
                    empty-state copy shown)
j/e ack roundtrip → acked 0→1 after e, →0 after
                    second e (un-ack)
✓ all done        → 23 items acked in one click;
                    API reverse-ack loop
                    ({id, at:null}) back to 0
? help panel      → opens with keyboard shortcut
                    list, Escape closes
```

首跑三项假象在干净复跑中排除（属既档方法注记）：
键盘断言前须点击 header 取焦而非 body.focus()；
ack-all 按钮文案为 "✓ all done" 带勾前缀；? 面板为
inline panel 非 dialog role。产品行为全部符合契约。

Cleanup: port 4992 clear, temp scripts/log removed,
0 residual CDP pages.

## Verdict

Triage-flow contracts all hold at the largest scale
yet. No P0/P1; docs-only, no changeset.
