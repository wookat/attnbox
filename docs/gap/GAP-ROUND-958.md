# GAP-ROUND-958: dogfood 数据健康度复查（waiting/ack 数据面 + 时长分布）

日期：2026-08-04。round-947 后首次数据健康度轮。结论先行：**4,624 会话数据面全干净（迄今最大），7/7 首跑全对，连续第七十四个干净数据轮，无 P0/P1**。

## 抽查结果（只读探针，daemon :4820 全量 API）

| # | 契约 | 结果 |
|---|------|------|
| 1 | items == summary.total（4,624/4,624） | PASS |
| 2 | 0 重复 ID | PASS |
| 3 | 0 未知状态 | PASS |
| 4 | 0 坏/未来时间戳 | PASS |
| 5 | waiting 计数与 summary 精确一致（9/9） | PASS |
| 6 | waiting 全带 detail+url+attention（0 缺失 / 9） | PASS |
| 7 | ack 台账为对象映射、13 条零孤儿 | PASS |

## 观察（非缺陷）

- waiting 时长中位 12.2 分钟，max 4,111.4 分钟为真实长挂会话忠实透传。

## 结论

- rounds 948–957 合并面后数据面无回归；纯文档轮，无源码改动；探针零残留。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准（GitHub Actions 保持禁用）。
