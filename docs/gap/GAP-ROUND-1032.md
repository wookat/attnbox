# GAP-ROUND-1032: 分诊全流程 UX 走查（round-1021 后首次）

日期：2026-08-17。基线：main `d9c73df`（#1066 合并后）。结论先行：**10/10 契约全通 @5,434 会话（迄今最大），rounds 1022–1031 合并面无分诊回归，无 P0/P1**；首跑 3 项假 FAIL 经根因调查判定为探针计数假设失效（台账存量陈旧 ack 条目），非产品缺陷，探针已修正为按值变更比对后复跑全通。

## 方法

- 隔离端口 `4914` 全新 daemon（`node packages/cli/dist/index.js --port 4914`，`pnpm build` 后），主 daemon 不受影响。
- Playwright headless Chromium，`domcontentloaded` 导航（SSE 长连接下禁用 `networkidle`）。
- ack 台账 `~/.attnbox/acked.json` 轮前 md5 `a3a67093…` 存证，走查后逐字节比对还原。
- 卡片选择器 `li[id^=item-]`；`/api/items` fetch 计数经 request 钩子统计。

## 首跑假 FAIL 根因（非缺陷）

首跑 5/6/8 三项 FAIL（`5-je-ack 11->11`、md5 MISMATCH ×2）。调查确认：waiting 项 `devin:devin-547d1b9d…` 在台账中已有**陈旧 ack 条目**（at `2026-08-08` < lastActivityAt，故按 `isAcked` 语义仍显示为未 ack）。`e` ack 与 `✓ all done` 对该项是**更新时间戳而非新增 key**，因此按 key 计数的探针断言（+1 / +9）失效；`at:null` 反 ack 只删 key，无法还原被更新的时间戳。产品行为完全符合 ack 契约（ack 写入、批量 ack 覆盖全部 9 个未 ack waiting、API 反 ack 生效）。探针修正为按「值变更集合」比对并以原时间戳还原，复跑 10/10 全通，台账 md5 逐字节还原。

## 结果（修正探针复跑 10/10 全通）

| # | 契约 | 结果 |
|---|------|------|
| 1 | 默认态 slim SSE：加载 0 次 `/api/items` 全量 fetch | PASS（fetches=0，首屏 48 卡） |
| 2 | Needs You 计数与 API 未 ack waiting 同刻精确一致 | PASS（ui=8 == api=8，快照时 1 项已被并行 live 转换 ack 语义覆盖） |
| 3 | 惰性搜索恰好 1 次全量 fetch | PASS（newFetches=1） |
| 4 | 负例搜索诚实空态 | PASS |
| 5 | 键盘 j 选中 + e ack 落台账 | PASS（值变更恰 1 条） |
| 6 | API 反 ack（原值还原）后台账逐字节还原 | PASS（md5 一致） |
| 7 | ✓ all done 批量 ack 覆盖全部未 ack waiting | PASS（值变更 8 == 期望 8） |
| 8 | 逐项反 ack（原值还原）后台账再次逐字节还原 | PASS（md5 一致） |
| 9 | ? 快捷键帮助面板 | PASS |
| 10 | 0 页面错误 / 0 console 错误 | PASS |

- API `summary.total` = 5,434（迄今最大）；waiting 9 / working 40 同刻快照。
- 台账终态 md5 `a3a670930a4b23fe057d219b79d6a5be` 与轮前逐字节一致，11 条零残留。
- 隔离 daemon（端口 4914）已按 PID 精确清理，端口释放确认；探针脚本已删除。

## 方法注记（入档）

台账中存在「陈旧 ack」条目（at < lastActivityAt）时，ack/批量 ack 对该项是更新时间戳而非新增 key。分诊探针的 ack 断言必须按**值变更集合**比对（新增 + 时间戳更新），反 ack 还原须回写原时间戳而非仅 `at:null` 删 key，否则会产生假 FAIL 与台账残留。

## 判定

rounds 1022–1031 全为纯文档轮，分诊面（slim SSE、搜索、过滤、批量 ack、反 ack、键盘链、帮助面板）无回归。无 P0/P1，本轮纯文档入档。
