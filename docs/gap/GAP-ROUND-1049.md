# GAP-ROUND-1049：PWA 离线快照 + SSE 断线/重连韧性复走

日期：2026-08-04（UTC）。round-1038 后首次 PWA/SSE 轮。结论先行：**6/6 首跑全通（隔离端口 4961 全新 daemon、主 daemon 4820 不受影响），0 JS pageerror，无 P0/P1。**

## 方法

- round-1038 同款探针（`pwa1049.tmp.mjs`）：隔离端口 4961 起全新 daemon，Playwright 走五段契约：SW 注册 → 杀 daemon 卡片保留 + 真实断线横幅（精确匹配 "Connection to the attnbox daemon lost"）→ 宕机冷刷 SW 快照恢复 → 重启 daemon 无刷新自动回 live → 全量 API 恢复。
- 探针结束杀掉隔离 daemon，复核端口释放与主 daemon 健康。

## 结果（6/6 全通）

| # | 契约 | 结果 |
|---|---|---|
| 1 | SW 注册 | PASS（regs=1） |
| 2 | 杀 daemon 卡片全保留 | PASS 45/45 |
| 3 | 真实断线横幅出现 | PASS |
| 4 | 宕机冷刷 SW 快照恢复 | PASS 45/45 |
| 5 | 重启无刷新自动回 live | PASS（~7s） |
| 6 | 全量 API 恢复 | PASS total=5,441（迄今最大） |

- 0 JS pageerror；console 7 条均为宕机窗口网络噪音（ERR_CONNECTION_REFUSED / ERR_INCOMPLETE_CHUNKED_ENCODING），预期断线表现。
- 探针零残留：端口 4961 释放，主 daemon 4820 全程健康（200）。

## 结论

- rounds 1039–1048 合并面无 PWA/SSE 回归。
- 无 P0/P1；纯文档轮。
