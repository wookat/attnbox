# GAP-ROUND-859 — dogfood 数据健康度复查（纯文档）

Round 859. 主驱动：waiting/ack 数据健康度 + waiting 时长分布
（round-848 后首次），@4,508 会话（迄今最大）。

## 契约核验（全部干净）

- items==summary.total 恒成立（4,508==4,508）；summary.waiting 与
  实际 waiting 计数一致（8/8）。
- 0 重复 ID、0 未知状态（waiting/working/idle/done 全覆盖）、
  0 坏/未来时间戳。
- waiting 8/8 全带 detail+url+attention。
- waiting 时长中位 3.7 分钟；max 3,187.4 分钟为真实长挂 Devin 会话
  忠实透传（抽查确认 detail 与 lastActivityAt 真实）。
- ack 台账 13 条零孤儿（全部对应存量 item ID）。

## Verdict

无 P0/P1，连续第六十五个干净数据轮，只读探针零残留。纯文档轮，
无 changeset。
