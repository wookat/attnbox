# GAP-ROUND-1087：分诊全流程 UX 走查（round-1076 后首次）

日期：2026-08-04 ｜ 基线：main 2e11290（#1121 合并后，99 测试绿）｜ 规模：live 5,471 会话（迄今最大）

## 结论

1. **无 P0/P1。** 11/11 契约全通，0 页面/console 错误。
2. 一条新探针方法注记入档：**陈旧 ack 条目影响期望值计算**——`✓ all done` 与 `j/e` 的台账断言不能只看条目数增减；已 ack waiting 项若 `lastActivityAt > acked-at`（陈旧 ack），web 端按 `isAcked` 时间戳语义视为未 ack，`✓ all done` 会原地刷新其值（条目数不变），探针须区分"新增条目"与"原地刷新"。
3. 台账轮前后 md5 逐字节一致（`5166cdf444b78b4bcb1fe55e7fbc8832`），探针零残留。

## 契约走查明细（主 daemon 4820，Playwright CDP 实测）

| # | 契约 | 结果 | 证据 |
|---|------|------|------|
| 1 | 默认态 slim：0 次全量 `/api/items` fetch | PASS | fetches=0，38 卡 |
| 2 | Needs You 徽章 == API 未 ack waiting（同刻，isAcked 语义） | PASS | 5==5，title=(5) attnbox |
| 3 | 惰性搜索恰好 1 次全量 fetch | PASS | fetches=1 |
| 4 | 负例搜索诚实空态 | PASS | cards=0 + 空态提示 |
| 5 | `?` 快捷键帮助面板 | PASS | 面板文本可见 |
| 6 | `j`+`e` ack 恰好所选项 | PASS | 19→20，sel=devin:devin-eb412d…，wasAcked=false |
| 7 | API 反 ack 原值回写还原 | PASS | now=19 |
| 8 | `✓ all done`：ack 全部未 ack waiting | PASS | delta=5 == expected=5 |
| 9 | 逐项反 ack 后台账还原 | PASS | 19==19 |
| 10 | items.length == summary.total | PASS | 5471 == 5471 |
| 11 | 0 页面/console 错误 | PASS | pageerr=0 consoleerr=0 |

## 方法

- 探针脚本本机 `~/a11y/ux1087.tmp.mjs`（不入库），经 CDP 复用既有 Chrome，`domcontentloaded`（SSE 常开不用 networkidle）。
- ack 判定镜像 web 端 `isAcked` 时间戳语义（`apps/web/src/App.tsx`）：台账存在键但 `lastActivityAt > at` 视为未 ack。
- 徽章/期望值均按语义计算；`✓ all done` 断言用"语义未 ack 集合"而非条目数差。
- 台账还原：逐项 POST 基线原值（含删除轮中新增键）+ 轮末 md5 逐字节比对双重验证。

## 收敛

rounds 1077–1086 合并面无分诊回归。三源被动聚合 + 键盘分诊差异化不变，继续循环。
