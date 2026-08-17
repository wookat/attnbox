# GAP-ROUND-1109：分诊全流程 UX 走查（round-1098 后首次）

日期：2026-08-04 ｜ 基线：main 5612466（#1143 合并后，99 测试绿）｜ 规模：live 5,496 会话（迄今最大）

## 结论

1. **无 P0/P1。** 12/12 契约首跑全通，0 页面/console 错误，零假 FAIL（rounds 1065/1087 三条探针方法注记前置采用）。
2. 台账轮前后 md5 逐字节一致（`5166cdf444b78b4bcb1fe55e7fbc8832`，19 条），探针零残留。

## 契约走查明细（主 daemon 4820，Playwright 实测）

| # | 契约 | 结果 | 证据 |
|---|------|------|------|
| 1 | 默认态 slim：0 次全量 `/api/items` fetch | PASS | fetches=0 |
| 2 | Needs You 徽章 == API 未 ack waiting（同刻，isAcked 语义） | PASS | 4==4 |
| 3 | 惰性搜索恰好 1 次全量 fetch | PASS | delta=1 |
| 4 | 负例搜索诚实空态 | PASS | "No sessions" 空态提示 |
| 5 | `?` 快捷键帮助面板 | PASS | 面板文本可见 |
| 6 | `j`+`e` ack 恰好所选项（台账值变更恰 1 条） | PASS | changed=[devin:devin-c5ca6f5d…] |
| 7 | API 反 ack 原值回写还原 | PASS | 原值精确还原 |
| 8 | items.length == summary.total | PASS | 5496 == 5496 |
| 9 | `✓ all done`：值变更集合 == 语义未 ack waiting 集合 | PASS | changed=4 == expected=4，id 集合完全一致 |
| 10 | 逐项反 ack 后台账还原（含原地刷新项回写原值） | PASS | diffs=0 |
| 11 | 0 页面错误 | PASS | pageerr=0 |
| 12 | 0 console 错误 | PASS | consoleerr=0 |

## 方法

- 探针脚本本机 `~/a11y/triage1109.tmp.mjs`（不入库），Playwright headless，`load` 等待（SSE 常开不用 networkidle）。
- ack 判定镜像 web 端 `isAcked` 时间戳语义（`apps/web/src/App.tsx`）：台账存在键但 `lastActivityAt > at` 视为未 ack。
- `✓ all done` 断言用"台账值变更集合 vs 语义未 ack 集合"的 id 集合比对，而非条目数差（round-1087 方法注记）。
- 台账还原：逐项 POST 基线原值 + 轮末 md5 逐字节比对双重验证。

## 收敛

rounds 1099–1108 合并面（全为纯文档轮）无分诊回归。三源被动聚合 + 键盘分诊差异化不变，继续循环。
