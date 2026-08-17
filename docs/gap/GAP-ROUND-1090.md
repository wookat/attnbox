# GAP-ROUND-1090：dogfood 数据健康度复查（waiting/ack + waiting 时长分布）

日期：2026-08-04（UTC）。round-1079 后首次数据健康度轮。结论先行：**5,474 会话数据面全干净（迄今最大），9/9 首跑全对，连续第八十六个干净数据轮，无 P0/P1。**

## 方法

只读探针直查主 daemon（127.0.0.1:4820）`/api/items` 一次快照，同刻断言，零写入零残留。

## 结果（9/9 首跑全对）

| # | 断言 | 结果 |
|---|------|------|
| 1 | items == summary.total | PASS（5474==5474） |
| 2 | waiting 计数与 summary 同刻一致 | PASS（7==7） |
| 3 | working 计数与 summary 同刻一致 | PASS（32==32） |
| 4 | 0 重复 ID | PASS（5474/5474 唯一） |
| 5 | 0 未知状态 | PASS（全部 ∈ waiting/working/idle/done） |
| 6 | 0 坏/未来时间戳 | PASS |
| 7 | waiting 全带 detail+url+attention | PASS（7/7） |
| 8 | ack 台账零孤儿 | PASS（19 条，0 孤儿） |
| 9 | 最长 waiting 为真实长挂会话忠实透传 | PASS（见下） |

## waiting 时长分布

- n=7，中位 7.7 分钟，max 3,911.8 分钟。
- max 项核实：Devin blocked 会话（attention=answer，带完整 detail 与 session URL），为真实长挂等待的忠实透传，非数据缺陷。

## 回归面

rounds 1080–1089 合并面（#1115–#1124，全为纯文档轮）无数据回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
