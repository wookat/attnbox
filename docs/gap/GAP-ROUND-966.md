# GAP-ROUND-966：分诊全流程 UX 走查（round-955 后首次）

日期：2026-08-04。结论先行：**11/11 契约首跑全通，无 P0/P1，纯文档轮。**

## 环境

- main @ #1000（README 品牌行）+ #999（ROUND-965 竞品档）合并后回归面。
- 实机 dogfood daemon（127.0.0.1:4820），**5,339 会话（迄今最大）**，16 waiting，ack 台账 13 条。
- 探针：Playwright（headless Chromium），`domcontentloaded` + 显式等待（SSE 长连不使用 networkidle，方法注记沿用 round-953）。

## 契约与结果（11/11 首跑全通）

| # | 契约 | 结果 | 证据 |
|---|------|------|------|
| 1 | 默认视图渲染卡片 | PASS | 58 卡 |
| 2 | 默认态 slim SSE，页面 0 次全量 /api/items fetch | PASS | itemsFetches=0 |
| 3 | Needs You 计数与 API 未 ack waiting 同刻精确一致 | PASS | ui=14 == api=14 |
| 4 | 惰性搜索恰好 1 次全量 fetch，客户端过滤 | PASS | delta=1，14 命中 |
| 5 | 负例搜索诚实空态 | PASS | 0 卡 |
| 6 | 键盘 j 选中 + e ack 台账 +1 | PASS | 13→14 |
| 7 | API 反 ack 台账逐字节还原 | PASS | byte-equal |
| 8 | ✓ all done 批量 ack 全部未 ack waiting | PASS | 13→29（+16） |
| 9 | 逐项反 ack 后台账再次逐字节还原 | PASS | removed 16，byte-equal |
| 10 | ? 快捷键帮助面板可见 | PASS | visible |
| 11 | 0 页面/console 错误 | PASS | 0 条 |

轮末台账 md5 与轮前一致（13 条，`6a71161233e790dfb225ce5555f060c9`），探针零残留。

## 结论

- rounds 956–965 合并面（含 #999/#1000）对分诊全流程无回归；Needs You 同刻一致性在 5,339 会话（迄今最大规模）下继续成立。
- 无 P0/P1；无假 FAIL。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准。
