# GAP-ROUND-980：dogfood 数据健康度复查（round-969 后首次）

日期：2026-08-04。基线 main：#1014（`77cd2e6`）。只读探针直查 live daemon `/api/items`（5,370 会话，迄今最大）。

## 检查结果（7/7 首跑全对）

| # | 检查项 | 结果 |
|---|---|---|
| 1 | items==summary.total（5,370==5,370），waiting/working 计数与 summary 精确一致（24/86） | PASS |
| 2 | 重复 ID | 0 |
| 3 | 未知状态 | 0 |
| 4 | 坏时间戳 / 未来时间戳 | 0 / 0 |
| 5 | waiting 24/24 全带 detail+url+attention | PASS |
| 6 | waiting 时长分布：中位 10.2 分钟，max 4,348.3 分钟（真实长挂会话忠实透传，非缺陷） | PASS |
| 7 | ack 台账 13 条零孤儿（全部 ID 存在于 live 数据集） | PASS |

## 结论

- 连续第七十六个干净数据轮；5,370 会话（较 round-978 的 5,369 自然增长）。
- 无 P0/P1；只读探针零残留。
- 本地门禁全绿（lint ✓ / typecheck ✓ / build ✓ / test 99 ✓）；GitHub Actions 按公司政策保持禁用/降级，以本地门禁为验收标准。
