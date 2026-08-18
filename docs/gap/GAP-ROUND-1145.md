# GAP-ROUND-1145：dogfood 数据健康度复查（waiting/ack + waiting 时长分布）

日期：2026-08-04（UTC）。round-1134 后首次数据健康度轮。结论先行：**5,535 会话数据面全干净（迄今最大），9/9 首跑全对，连续第九十一个干净数据轮，无 P0/P1。**

## 方法

只读探针直查主 daemon（127.0.0.1:4820）`/api/items` 一次快照，同刻断言；ack 台账直读 `~/.attnbox/acked.json` 与同刻 id 集合比对。零写入零残留，台账轮前后 md5 逐字节一致（5166cdf4…，19 条）。

## 结果（9/9 首跑全对）

| # | 断言 | 结果 |
|---|------|------|
| 1 | items == summary.total | PASS（5535==5535） |
| 2 | waiting 计数与 summary 同刻一致 | PASS（6==6） |
| 3 | working 计数与 summary 同刻一致 | PASS（30==30） |
| 4 | 0 重复 ID | PASS（5535/5535 唯一） |
| 5 | 0 未知状态 | PASS（首跑即 0，无瞬时 unknown） |
| 6 | 0 坏/未来时间戳 | PASS |
| 7 | waiting 全带 detail+url+attention | PASS（6/6） |
| 8 | ack 台账零孤儿 | PASS（19 条，0 孤儿） |
| 9 | waiting 时长分布健康（见下） | PASS |

## waiting 时长分布

- n=6；时长（分钟）：6.7 / 10.1 / 10.5 / 15.5 / 21.1 / 23.4；中位 15.5 分钟，max 23.4 分钟。
- 全部为新鲜 waiting 项，无超长挂项（round-1134 收口态势延续）。

## 方法注记（沿用）

- round-1101 注记前置采用："0 未知状态"断言遇 FAIL 须先经状态模型 + 上游 API 一手核实再定性；本轮首跑即 0，无需触发。
- ack 台账断言按 id 集合比对（非计数），沿用 round-1105 方法注记。

## 回归面

rounds 1135–1144 合并面（#1170–#1179，全为纯文档轮）无数据回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
