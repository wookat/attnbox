# GAP-ROUND-878 — 分诊全流程 UX 走查（纯文档）

Round 878. 主驱动：搜索→过滤→ack all→反 ack + 键盘链契约走查——round-867
后首次，@4,544 会话（迄今最大）。

## 证据（10/10 首跑全通）

- 默认态 68 卡 0 全量 fetch（slim SSE 契约成立）。
- Needs you 过滤 19 卡与 API waiting 计数精确一致。
- 惰性搜索恰好 1 次全量 fetch，中文词条 119 命中；负例诚实空态 0 卡。
- j/e 键盘 ack 台账 13→14；API 反 ack（{id, at: null}）台账逐字节还原。
- ✓ all done 13→31，逐项反 ack 后轮询至逐字节还原成功。
- ? 快捷键帮助面板正常弹出。
- 全程 0 pageerror、0 console error。

## 方法注记

- 无新注记；沿用既有方法（li[id^="item-"] 选择器、搜索后焦点移出、
  ack-all 还原轮询 byte-identical、时间戳字段 lastActivityAt）。

## Verdict

无 P0/P1，rounds 868–877 合并面上分诊全流程契约无回归。探针零残留
（triage878.tmp.mjs 已删）。纯文档轮，无 changeset。
