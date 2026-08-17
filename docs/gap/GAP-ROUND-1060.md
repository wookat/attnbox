# GAP-ROUND-1060：PWA 离线快照 + SSE 断线/重连韧性复走

日期：2026-08-04（UTC）。round-1049 后首次 PWA/SSE 轮。结论先行：**6/6 首跑全通（隔离端口 4986 全新 daemon、主 daemon 4820 不受影响），全量 API 恢复 total=5,451（迄今最大）。无 P0/P1。**

## 方法

- 隔离端口 4986 起全新 daemon，Playwright 实机走查；主 daemon 4820 全程健康（轮后复核 total=5,451）。
- 序列：SW 注册 → 杀 daemon（断线保留 + 横幅）→ 宕机冷刷（SW 快照恢复）→ 重启 daemon（无刷新自动回 live）→ 全量 API 复核。

## 结果（6/6）

1. SW 注册：regs=1。
2. 杀 daemon：47 卡全保留（47/47）。
3. 真实断线横幅出现（"Connection to the attnbox daemon lost" 精确匹配）。
4. 宕机冷刷：SW 快照恢复 47/47。
5. 重启 ~8s 无刷新自动回 live。
6. 全量 API 恢复 total=5,451（迄今最大）。

- 0 JS pageerror；console 7 条均为宕机窗口网络噪音（ERR_CONNECTION_REFUSED / ERR_INCOMPLETE_CHUNKED_ENCODING），预期断线表现。
- 隔离端口轮后已释放，探针零残留。

## 对照面

- rounds 1050–1059 合并面（#1085–#1094，全为纯文档轮）无 PWA/SSE 回归。

## 结论

- 无 P0/P1；纯文档轮。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
