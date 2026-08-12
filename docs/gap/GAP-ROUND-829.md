# GAP-ROUND-829：PWA 离线快照 + SSE 韧性复走（round-818 后首次）

日期：2026-08-04。主驱动：PWA 离线快照 + SSE 断线/重连韧性。纯文档轮，无 P0/P1。

## 实测证据（生产 daemon @4,463+ 会话）

5/5 首跑全通：

1. SW 注册正常（1 registration）。
2. 杀 daemon 后 58 卡全保留 + offline 指示出现。
3. 宕机中冷刷新，SW 快照恢复 58/58 卡。
4. 重启 daemon 后 ~31s 无刷新自动回 live（含 daemon 冷启动扫描时间，非纯重连延迟）。
5. 0 JS pageerror；console 15 条均为宕机窗口 `ERR_CONNECTION_REFUSED`/`ERR_INCOMPLETE_CHUNKED_ENCODING` 网络噪音，属预期断线表现，非产品缺陷。

复测后 daemon 全量爬取恢复至 4,468 会话（迄今最大），API 200 正常。探针零残留。

## P0/P1 判定

无。

## 门禁

本地 `pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
