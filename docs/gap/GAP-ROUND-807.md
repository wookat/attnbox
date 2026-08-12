# GAP-ROUND-807：PWA 离线快照 + SSE 韧性复走——5/5 全通

日期：2026-08-04
驱动维度：PWA/SSE 韧性（round-796 后首次）

## 实测（真实 daemon @4,436+ 会话）

1. Service worker 注册 ✓。
2. 杀 daemon：56 卡全保留 + offline 指示出现 ✓。
3. 宕机中冷刷新：SW 快照恢复 56/56 卡 ✓。
4. 重启 daemon：~7s 无刷新自动回 live（offline 指示消失，卡片保持）✓。
5. 全程 0 页面错误；两段 daemon 日志零错误 ✓。

方法注记：探针内用 `execSync` 带 `nohup &` 重启 daemon 会因子进程持有 stdio 管道令 execSync 永久阻塞——须改用 `spawn(..., { detached: true, stdio: "ignore" })` + `unref()`（首跑挂起为探针工具问题，非产品缺陷）。探针零残留。

## 结论

PWA 离线快照与 SSE 断线/重连契约全部成立，无 P0/P1。纯文档轮。
