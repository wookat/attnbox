# GAP-ROUND-1068：dogfood 数据健康度复查（waiting/ack + 时长分布）

日期：2026-08-04（UTC）。round-1057 后首次数据健康度轮。结论先行：**5,456 会话数据面全干净（迄今最大），8/8 首跑全对，连续第八十四个干净数据轮。无 P0/P1。**

## 方法

- 只读探针直查主 daemon `http://127.0.0.1:4820/api/items`（全量），零写入、零残留。
- 检查面：items==summary.total、状态计数同刻一致、重复 ID、未知状态、坏/未来时间戳、waiting 完整性（detail+url+attention）、waiting 时长分布、ack 台账孤儿。

## 结果（8/8 首跑全对）

- items==summary.total：5,456==5,456 恒成立。
- waiting 13==13 / working 33==33 与 summary 同刻精确一致。
- 0 重复 ID（5,456/5,456 唯一）。
- 0 未知状态。
- 0 坏时间戳、0 未来时间戳。
- waiting 13/13 全带 detail+url+attention。
- waiting 时长分布：中位 19.0 分钟；max 3,533.7 分钟为真实长挂 Devin blocked 会话（"O2-优化：页面层…"）忠实透传，非数据缺陷。
- ack 台账 19 条、零孤儿（全部对应当前会话）。

## 结论

- 无 P0/P1；纯文档轮。rounds 1058–1067 合并面无数据回归。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
