# GAP-ROUND-870 — dogfood 数据健康度复查（纯文档）

Round 870. 主驱动：waiting/ack 数据健康度 + waiting 时长分布
（round-859 后首次），@4,524 会话（迄今最大）。

## 证据（7/7 全部干净）

- items==summary.total 恒成立（4,524/4,524）。
- 0 重复 ID、0 未知状态、0 坏/未来时间戳。
- waiting 15/15 与 summary.waiting 精确一致，全部带
  detail+url+attention。
- waiting 时长中位 13.0 分钟、max 3,297.0 分钟为真实长挂会话忠实透传。
- ack 台账 13 条 object map、零孤儿。

## 方法注记

- item 时间戳字段为 `lastActivityAt`（首跑 1 处假 FAIL 为探针误用
  `updatedAt`/`since` 字段名），非产品缺陷。

## Verdict

无 P0/P1，连续第六十六个干净数据轮，只读探针零残留。纯文档轮，
无 changeset。
