# GAP-ROUND-1002: dogfood 数据健康度复查（round-991 后首次）

日期：2026-08-04。主驱动：waiting/ack 数据健康度 + waiting 时长分布（只读探针，4820 live daemon）。结论先行：**5,412 会话数据面全干净，7/7 首跑全对，连续第七十八个干净数据轮，无 P0/P1**。

## 结果（7/7 PASS）

| # | 检查 | 结果 |
|---|------|------|
| 1 | items==summary.total | PASS（5,412==5,412，迄今最大） |
| 2 | 重复 ID | PASS（0） |
| 3 | 未知状态 | PASS（0） |
| 4 | 坏/未来时间戳 | PASS（0） |
| 5 | waiting 计数与 summary 一致 | PASS（13==13；working 57==57 同刻一致） |
| 6 | waiting 全带 detail+url+attention | PASS（13/13） |
| 7 | ack 台账孤儿 | PASS（台账 11 条，0 孤儿） |

## waiting 时长分布

n=13，中位 21.8 分钟，min 3.2 分钟，max 2,904.2 分钟（真实长挂会话忠实透传，非缺陷）。

## 结论

rounds 992–1001 合并面无数据回归。只读探针零残留。无 P0/P1；本轮纯文档。继续循环。
