# GAP-ROUND-1071：PWA 离线快照 + SSE 断线/重连韧性复走

日期：2026-08-04（UTC）。round-1060 后首次 PWA/SSE 韧性轮。结论先行：**6/6 首跑全通（隔离端口 4991 全新 daemon、主 daemon 不受影响），0 JS pageerror。无 P0/P1。**

## 方法

- 隔离端口 4991 起全新 daemon，主 daemon 4820 全程不受影响。
- 链路：SW 注册 → 杀 daemon（卡片保留 + 真实断线横幅）→ 宕机冷刷（SW 快照恢复）→ 重启 daemon（无刷新自动回 live）→ 全量 API 恢复。
- 只读探针，用后即删零残留；断线横幅用真实文本精确匹配（round-1038 方法注记前置采用）。

## 结果

- SW 注册 1 个 ✓。
- 杀 daemon 后 40 卡全保留 + 断线横幅出现 ✓。
- 宕机冷刷 SW 快照恢复 40/40 ✓。
- 重启 ~7s 无刷新自动回 live ✓。
- 全量 API 恢复 total=5,457 ✓。
- 0 JS pageerror（console 7 条均为宕机窗口网络噪音、预期断线表现）。

## 结论

- 无 P0/P1；纯文档轮。rounds 1061–1070 合并面无 PWA/SSE 回归。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
