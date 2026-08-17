# GAP-ROUND-1013: dogfood 数据健康度复查（round-1002 后首次）

日期：2026-08-17。基线：main `9068b00`（#1047 合并后）。结论先行：**5,420 会话数据面全干净，7/7 首跑全对，连续第七十九个干净数据轮。无 P0/P1。**

## 方法

- 只读探针直查主 daemon（127.0.0.1:4820）`/api/items` 全量 + 本地 ack 台账（`~/.attnbox/acked.json`），零写入、零残留。

## 结果（7/7 PASS）

| # | 检查 | 结果 |
|---|---|---|
| 1 | items==summary.total 且 waiting/working 计数与 summary 同刻精确一致 | PASS（total=5,420，waiting 15==15，working 46==46） |
| 2 | 0 重复 ID | PASS（5,420/5,420 唯一） |
| 3 | 0 未知状态 | PASS |
| 4 | 0 坏/未来时间戳 | PASS |
| 5 | waiting 全带 detail+url+attention | PASS（15/15） |
| 6 | waiting 时长分布可计算 | PASS（中位 14.9 分钟，max 3,004.2 分钟为真实长挂会话忠实透传） |
| 7 | ack 台账可解析、零孤儿格式 | PASS（11 条） |

## 备注

- 5,420 会话为迄今最大数据面。rounds 1003–1012 合并面无数据回归。
- 本地门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。
