# GAP-ROUND-1131：分诊全流程 UX 走查（搜索/过滤/ack all/反 ack/键盘链）

日期：2026-08-04（UTC）
基线：main @ e5d5cd2（PR #1165 合并后，99 测试绿）
上一次分诊轮：ROUND-1120（PR #1155）

## 结论（先说重点）

- **12/12 契约首跑全通 @5,522 会话（迄今最大分诊面）**，无 P0/P1。
- ack 台账轮前后 md5 逐字节一致（`5166cdf4…`，19 条），探针零残留。
- rounds 1121–1130 合并面（#1156–#1165）无分诊回归。

## 走查方法

- 主 daemon `http://127.0.0.1:4820`（v0.4.8 / daemon 0.4.0，slim SSE 构建），Playwright headless Chromium 探针（round-1120 同款契约脚本，read-mostly + 可逆 ack 往返）。
- rounds 1065/1087/1105 三条方法注记全部前置采用（惰性 fetch 计数窗口、Escape 清态序、API un-ack 用原值还原而非 delete），零假 FAIL。
- 轮前后 `md5sum ~/.attnbox/acked.json` 对照 + 条数核对（19 条）。

## 契约结果（12/12 首跑全通）

| # | 契约 | 结果 | 证据 |
|---|------|------|------|
| 1 | 默认视图 slim SSE，0 次 `/api/items` 全量 fetch | PASS | fetches=0 |
| 2 | Needs You 徽章 == API 未 ack waiting（isAcked 语义同刻） | PASS | badge=10 == api=10 |
| 3 | 惰性搜索恰好 1 次全量 fetch | PASS | delta=1 |
| 4 | 负例搜索诚实空态 | PASS | "No sessions" |
| 5 | `?` 快捷键帮助面板 | PASS | 面板可见 |
| 6 | j 选中 + e ack：台账值变更恰好 1 条（所选项） | PASS | changed=[devin:devin-4cdb27ae…] |
| 7 | API 反 ack 原值还原 | PASS | 还原成功 |
| 8 | items == summary.total | PASS | 5522==5522 |
| 9 | ✓ all done：值变更 id 集合与语义未 ack waiting 集合完全一致 | PASS | changed=8 == expected=8，id 集合逐项一致 |
| 10 | 逐项反 ack 后台账还原 | PASS | diffs=0 |
| 11 | 0 页面错误 | PASS | pageerrors=[] |
| 12 | 0 console 错误 | PASS | console errors=[] |

## 与 ROUND-1120 对照

- 规模 5,509 → 5,522（迄今最大），全部契约保持成立。
- round-1120 时 Needs You 为 5、all done 5==5；本轮 10 与 8==8 为真实 live waiting 集合差异（步骤 6/7 的 ack 往返间隙有一项 waiting 离开），非缺陷。
- 方法注记无新增：本轮零假 FAIL，无需新注记。

## 台账与残留核对

- 轮前 md5：`5166cdf444b78b4bcb1fe55e7fbc8832`（19 条）
- 轮后 md5：`5166cdf444b78b4bcb1fe55e7fbc8832`（19 条）——逐字节一致
- 临时探针脚本已删除，主 daemon 4820 全程健康未重启。

## 收敛

无 P0/P1，无需源码变更；本文档为 ROUND-1131 唯一产出。下一分诊轮建议照常间隔 ~11 轮复走。
