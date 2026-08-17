# GAP-ROUND-1057：dogfood 数据健康度复查（waiting/ack 数据健康度 + waiting 时长分布）

日期：2026-08-04（UTC）。round-1046 后首次数据健康度轮。结论先行：**5,449 会话数据面全干净（迄今最大），8/8 首跑全对，无 P0/P1。连续第八十三个干净数据轮。**

## 方法

- 只读探针直查主 daemon（4820）`/api/items` + 本地 ack 台账 `~/.attnbox/acked.json`，零写入零残留。
- 检查面：items==summary.total、重复 ID、未知状态、坏/未来时间戳、waiting/working 计数与 summary 同刻一致、waiting 项 detail+url+attention 完备性、waiting 时长分布、ack 台账孤儿。

## 结果（8/8 首跑全对 @5,449 会话，迄今最大）

- items==summary.total：5,449==5,449 恒成立。
- 重复 ID：0；未知状态：0；坏/未来时间戳：0。
- waiting 7==7 / working 40==40 与 summary 同刻精确一致。
- waiting 7/7 全带 detail+url+attention。
- waiting 时长分布：中位 17.2 分钟、max 3,429.1 分钟——逐项核查确认 max 为真实长挂 Devin blocked 会话（O2 完成待用户确认）忠实透传，非数据缺陷；其余 6 项 3.2–31.0 分钟均新鲜。
- ack 台账 11 条零孤儿。

## 对照面

- rounds 1047–1056 合并面（#1082–#1091，全为纯文档轮）无数据回归。

## 结论

- 无 P0/P1；纯文档轮。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
