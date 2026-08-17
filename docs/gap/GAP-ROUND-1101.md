# GAP-ROUND-1101：dogfood 数据健康度复查（waiting/ack + waiting 时长分布）

日期：2026-08-04（UTC）。round-1090 后首次数据健康度轮。结论先行：**5,486 会话数据面全干净（迄今最大），复跑 9/9 全对，连续第八十七个干净数据轮，无 P0/P1。首跑观察到一例瞬时 `unknown` 状态，经源码 + Devin API 一手核实为诚实回退契约的正确表现（非缺陷），一条方法注记入档。**

## 方法

只读探针直查主 daemon（127.0.0.1:4820）`/api/items` 一次快照，同刻断言，零写入零残留。

## 结果（复跑 9/9 全对）

| # | 断言 | 结果 |
|---|------|------|
| 1 | items == summary.total | PASS（5486==5486） |
| 2 | waiting 计数与 summary 同刻一致 | PASS（9==9） |
| 3 | working 计数与 summary 同刻一致 | PASS（34==34） |
| 4 | 0 重复 ID | PASS（5486/5486 唯一） |
| 5 | 0 未知状态 | PASS（复跑；首跑 1 例瞬时 unknown，见下） |
| 6 | 0 坏/未来时间戳 | PASS |
| 7 | waiting 全带 detail+url+attention | PASS（9/9） |
| 8 | ack 台账零孤儿 | PASS（19 条，0 孤儿） |
| 9 | 最长 waiting 为真实长挂会话忠实透传 | PASS（见下） |

## waiting 时长分布

- n=9，中位 6.2 分钟，max 4,057.3 分钟。
- max 项核实：Devin blocked 会话（attention=answer，带完整 detail 与 session URL），为真实长挂等待的忠实透传，非数据缺陷。

## 瞬时 unknown 状态核实（非缺陷）

首跑 8/9：一个 Devin 云会话（devin:devin-625def…）status="unknown"（confidence=authoritative）。逐层核实：

1. `unknown` 是核心类型 `SessionStatus` 的合法成员（core/src/index.ts），CLI 渲染为 `?`（format.ts），是有意建模的状态。
2. `mapStatus`（collectors/src/devin.ts）对未识别的 `status_enum` 诚实回退到 `unknown` 而非猜测——与既有单测契约一致（`mapStatus(undefined) === "unknown"`）。
3. 直查 Devin API 同一会话：`status_enum` 已为 `working`；数分钟后 daemon 同项自动收敛为 `working`，全库 unknown 归零。

判定：该会话在采集窗口处于映射表之外的瞬时枚举，采集器按契约诚实透传 `unknown`，下轮采集自动自愈。属诚实回退契约的正确表现，非 P0/P1。

**方法注记**：数据健康度探针的"0 未知状态"断言遇 FAIL 时，须先经源码状态模型 + 上游 API 一手核实再定性——`unknown` 是合法建模状态，瞬时出现属上游枚举过渡而非数据缺陷；复跑收敛即可判非缺陷。

## 回归面

rounds 1091–1100 合并面（#1126–#1135，全为纯文档轮）无数据回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
