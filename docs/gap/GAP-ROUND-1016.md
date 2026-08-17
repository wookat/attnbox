# GAP-ROUND-1016: PWA 离线快照 + SSE 韧性复走（round-1005 后首次）

日期：2026-08-17。基线：main `711c152`（#1050 合并后）。结论先行：**5/5 首跑全通，无 P0/P1。**

## 方法

隔离端口全新 daemon（4909）+ Playwright：SW 注册 → 杀 daemon（断线保留 + offline 指示）→ 宕机冷刷（SW 快照恢复）→ 重启 daemon（无刷新自动回 live）→ 全量 API 恢复。

## 结果

| # | 场景 | 结果 |
|---|---|---|
| 1 | Service Worker 注册 | PASS |
| 2 | 杀 daemon：57 卡全保留 + offline 指示 | PASS |
| 3 | 宕机冷刷：SW 快照恢复 57/57 卡 | PASS |
| 4 | 重启 daemon：~6s 无刷新自动回 live | PASS |
| 5 | 全量 API 恢复 total=5,420 | PASS |

- 0 JS pageerror；console 7 条均为宕机窗口网络噪音（ERR_CONNECTION_REFUSED / ERR_INCOMPLETE_CHUNKED_ENCODING），预期断线表现。
- 复走后隔离端口关闭、探针零残留；主 daemon（4820）@5,420 会话不受影响。
- rounds 1006–1015 合并面无 PWA/SSE 回归。

## 证据

- 本地门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。
