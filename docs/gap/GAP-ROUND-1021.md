# GAP-ROUND-1021: 分诊全流程 UX 走查（round-1010 后首次）

日期：2026-08-17。基线：main `4a56414`（#1055 合并后）。结论先行：**10/10 契约首跑全通 @5,429 会话（迄今最大），rounds 1011–1020 合并面无分诊回归，无 P0/P1**。

## 方法

- 主 daemon `http://127.0.0.1:4820`，Playwright headless Chromium，`domcontentloaded` 导航（SSE 长连接下禁用 `networkidle`）。
- ack 台账 `~/.attnbox/acked.json` 轮前 md5 存证，走查后逐字节比对还原。
- 卡片选择器 `li[id^=item-]`；`/api/items` fetch 计数经 request 钩子统计。

## 结果（10/10 首跑全通）

| # | 契约 | 结果 |
|---|------|------|
| 1 | 默认态 slim SSE：加载 0 次 `/api/items` 全量 fetch | PASS（fetches=0，首屏 55 卡） |
| 2 | Needs You 计数与 API 未 ack waiting 同刻精确一致 | PASS（ui=9 == api=9） |
| 3 | 惰性搜索恰好 1 次全量 fetch | PASS（newFetches=1） |
| 4 | 负例搜索诚实空态 | PASS |
| 5 | 键盘 j 选中 + e ack 落台账 | PASS（11→12） |
| 6 | API 反 ack 后台账逐字节还原 | PASS（md5 一致） |
| 7 | ✓ all done 批量 ack | PASS（11→20，+9） |
| 8 | 9 项逐项反 ack 后台账再次逐字节还原 | PASS（md5 一致） |
| 9 | ? 快捷键帮助面板 | PASS |
| 10 | 0 页面错误 / 0 console 错误 | PASS |

- API `summary.total` = 5,429（迄今最大）；`waiting 9 / working 46` 同刻快照，Needs You 与 API 未 ack waiting 精确一致。
- 台账终态 md5 `a3a670930a4b23fe057d219b79d6a5be` 与轮前一致，11 条零残留；探针脚本已删除。

## 判定

rounds 1011–1020 全为纯文档轮，分诊面（slim SSE、搜索、过滤、批量 ack、反 ack、键盘链、帮助面板）无回归。无 P0/P1，本轮纯文档入档。
