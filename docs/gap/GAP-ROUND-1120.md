# GAP-ROUND-1120：分诊全流程 UX 走查（搜索→过滤→ack all→反 ack + 键盘链）

日期：2026-08-04（UTC）  
基线：main @ a073cdd（PR #1154 合并后，99 测试绿）  
上一次分诊轮：ROUND-1109（PR #1144，@5,496）

## 环境

- 主 daemon `http://127.0.0.1:4820`，真实 live 数据 **5,509 会话**（迄今最大）。
- 探针：Playwright headless Chromium + 直查 `/api/items`，同刻比对 UI 与 API。
- ack 台账 `~/.attnbox/acked.json` 轮前备份，轮前 md5 `5166cdf444b78b4bcb1fe55e7fbc8832`。

## 结果：12/12 契约首跑全通，无 P0/P1

| # | 契约 | 结果 |
|---|------|------|
| 1 | 默认视图 slim SSE，0 次全量 `/api/items` fetch | PASS（fetches=0） |
| 2 | Needs You 徽章 == API 语义未 ack waiting（isAcked 语义） | PASS（5==5，同刻精确一致） |
| 3 | 搜索惰性加载：恰 1 次全量 fetch | PASS（delta=1） |
| 4 | 负例搜索诚实空态 | PASS（"No sessions"） |
| 5 | `?` 快捷键帮助面板 | PASS |
| 6 | `j`+`e` ack 恰好所选 1 项（台账值变更 id 集合比对） | PASS（恰 1 条，devin 会话） |
| 7 | API 反 ack 还原原值 | PASS |
| 8 | `items == summary.total` | PASS（5509==5509） |
| 9 | ✓ all done：值变更 id 集合 == 语义未 ack waiting 集合 | PASS（5==5，逐 id 一致） |
| 10 | 逐项反 ack 后台账还原 | PASS（diffs=0） |
| 11 | 0 页面错误 | PASS |
| 12 | 0 console 错误 | PASS |

## 台账与残留

- 轮后 `~/.attnbox/acked.json` md5 `5166cdf444b78b4bcb1fe55e7fbc8832`，与轮前逐字节一致（`cmp` 0 差异）。
- 探针进程零残留，主 daemon 4820 全程健康（轮后复查 5,509 / waiting 6 / working 34，waiting 7→6 为真实 live 转换）。

## 方法注记

- 沿用 rounds 1065/1087/1105 三条方法注记（陈旧 ack 条目按值变更而非条目数断言；all done/反 ack 一律按精确 id 集合比对；探针自身的 node fetch 不计入页面 fetch 计数），本轮零假 FAIL。

## 结论

rounds 1110–1119 合并面（#1145–#1154，全为纯文档轮）无分诊回归。无 P0/P1，本轮纯文档入档。
