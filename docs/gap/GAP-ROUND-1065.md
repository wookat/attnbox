# GAP-ROUND-1065: 分诊全流程 UX 走查（搜索→过滤→ack all→反 ack + 键盘链）

日期：2026-08-04（UTC）。round-1054 后首次分诊轮，基线 main @ bde9598（#1099 合并后）。结论先行：**10/10 契约全通 @5,453+ 会话，无 P0/P1；台账终态 md5 与轮前逐字节一致，探针零残留**。首跑 3 项假 FAIL 经根因调查判定为**探针数据模型假设失效**（详见方法注记），非产品缺陷。

## 环境

- 主 daemon：`http://127.0.0.1:4820`（生产实例，未重启）
- 数据规模：total 5,453+，waiting 8（其中 6 条为台账既有 ack、2 条未 ack）
- 探针：Playwright（chromium，CDP 复用既有浏览器）+ API 采样；就绪策略 `domcontentloaded` + `li[id^="item-"]`（round-1041 方法注记沿用）
- ack 比对方法：按**值变更**比对 + 反 ack 回写原时间戳（round-1032 方法注记沿用）

## 结果（10/10 全通）

| # | 契约 | 结果 | 证据 |
|---|------|------|------|
| 1 | 默认态 slim：卡片渲染且 0 次全量 `/api/items` fetch | PASS | 8 卡，itemsFetches=0 |
| 2 | Needs You 徽章 == API 未 ack waiting；卡片数 == 全部 waiting | PASS | badge 2 == api 2；cards 8 == waiting 8（已 ack 项按设计以变暗态保留在列表中） |
| 3 | 惰性搜索：首次搜索恰好 1 次全量 fetch | PASS | fetches delta=1 |
| 4 | 负例搜索诚实空态 | PASS | 无效词 → 0 卡 + 空态 |
| 5 | `?` 快捷键帮助面板 | PASS | 面板出现，Esc 关闭 |
| 6 | `j`/`e` 键盘 ack：台账值变更恰 1 条 | PASS | changed=1 removed=0 |
| 7 | API 反 ack（回写原值）还原 | PASS | devin:devin-604e7959… 恢复原值 |
| 8 | ✓ all done：值变更数 == 未 ack waiting 数 | PASS | changed=2 == expected=2 |
| 9 | 逐项反 ack 后台账再次还原 | PASS | acked map pre=19 == final=19 值逐条相等 |
| 10 | 全程 0 页面/console 错误 | PASS | pageerror=0, console error=0 |

台账 `~/.attnbox/acked.json` 轮前后 md5 逐字节一致（f7ebb960…）。

## 方法注记（本轮新增，首跑 3 项假 FAIL 根因）

1. **ack 状态在 API 的位置**：`/api/items` 返回**顶层 `acked` 映射**（`{ id: ackedAtISO }`），item 对象上**不存在 `ackedAt` 字段**。探针若按 `item.ackedAt` 计数将恒得 0，导致 j/e ack、反 ack、all done 三项全部假 FAIL。正确做法：读取 `payload.acked`，并按 web 端 `isAcked` 语义（`lastActivityAt <= acked[id]` 才算生效）判定有效 ack。
2. **Needs You 卡片数语义**：Needs You 过滤按 `status === "waiting"` 显示**全部 waiting 卡**（已 ack 的以变暗态列于下方），徽章计数只统计未 ack。台账存在存量 ack-waiting 项时（本轮 6 条），"卡片数 == 徽章数"的断言是探针假设错误，非缺陷。既往轮次恰逢 ack-waiting 为 0 故未暴露。
3. 键盘选中态 DOM 标记为 CSS 类 `.ring-2`（无 `data-selected`/`aria-current`）。

## 结论

- rounds 1055–1064 合并面（#1090–#1099，全为纯文档轮）无分诊回归。
- 搜索→过滤→ack all→反 ack→键盘链全链路在 5,453+ 会话规模下契约全部成立。
- 无 P0/P1，本轮纯文档。
