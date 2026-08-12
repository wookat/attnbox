# GAP-ROUND-856 — 分诊全流程 UX 走查（纯文档）

Round 856. 主驱动：分诊全流程 UX 走查（round-845 后首次）——搜索→
过滤→ack all→反 ack + 键盘链，@4,506 会话（迄今最大）。

## 契约核验（11/11 成立）

- 默认态 57 卡渲染、0 次全量 `/api/items` fetch（slim SSE 契约）。
- Needs you 过滤 12 卡，与 API waiting 计数精确一致。
- 惰性搜索恰好 1 次全量 fetch，4 命中；负例搜索诚实空态（0 卡）。
- j/e 键盘 ack：台账 13→14；API 反 ack 逐字节还原。
- ✓ all done：台账 13→24（11 个 waiting 全 ack）；逐项 API 反 ack
  后台账逐字节还原（隔离复测确认）。
- ? 帮助面板正常弹出；Escape 关闭。
- 0 pageerror / 0 console error。

## 方法注记

- 首跑 "ack-all 还原" 1 处假 FAIL 为探针竞态：11 个连续 un-ack POST
  后仅等 800ms 即读台账，daemon 持久化尚未落盘。等待 3s 后隔离复测
  逐字节还原成立，非产品缺陷。

## Verdict

无 P0/P1，契约全部成立，台账逐字节还原、探针零残留。纯文档轮，
无 changeset。
