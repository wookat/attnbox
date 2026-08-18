# GAP-ROUND-1123：dogfood 数据健康度复查（waiting/ack + waiting 时长分布）

日期：2026-08-18（UTC）。round-1112 后首次数据健康度轮。结论先行：**5,509 会话数据面全干净（并列迄今最大），9/9 首跑全对，连续第八十九个干净数据轮，无 P0/P1。**

## 方法

只读探针直查主 daemon（127.0.0.1:4820）`/api/items` 一次快照，同刻断言；ack 台账直读 `~/.attnbox/acked.json` 与同刻 id 集合比对。零写入零残留，台账轮前后 md5 逐字节一致（5166cdf4…）。

## 结果（9/9 首跑全对）

| # | 断言 | 结果 |
|---|------|------|
| 1 | items == summary.total | PASS（5509==5509） |
| 2 | waiting 计数与 summary 同刻一致 | PASS（8==8） |
| 3 | working 计数与 summary 同刻一致 | PASS（31==31） |
| 4 | 0 重复 ID | PASS（5509/5509 唯一） |
| 5 | 0 未知状态 | PASS（首跑即 0，无瞬时 unknown） |
| 6 | 0 坏/未来时间戳 | PASS |
| 7 | waiting 全带 detail+url+attention | PASS（8/8） |
| 8 | ack 台账零孤儿 | PASS（19 条，0 孤儿） |
| 9 | 最长 waiting 为真实长挂会话忠实透传 | PASS（见下） |

## waiting 时长分布

- n=8；中位 9.8 分钟，max 4,340.3 分钟。
- max 项核实：Devin blocked 云会话（devin:devin-a77b58…，带完整 detail 与 session URL），与 rounds 1090/1101/1112 同一会话同一形态，为真实长挂等待的忠实透传，非数据缺陷。

## 方法注记（沿用）

- round-1101 注记前置采用："0 未知状态"断言遇 FAIL 须先经状态模型 + 上游 API 一手核实再定性；本轮首跑即 0，无需触发。
- ack 台账断言按 id 集合比对（非计数），沿用 round-1105 方法注记。

## 回归面

rounds 1113–1122 合并面（#1148–#1157，全为纯文档轮）无数据回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
