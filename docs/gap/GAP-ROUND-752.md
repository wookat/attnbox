# GAP-ROUND-752：PWA 离线快照 + SSE 断线/重连韧性复走——5/5 全通

日期：2026-08-04
驱动维度：PWA/SSE 韧性（round-741 后首次）

## 证据（@4,373 会话，迄今最大）

- 杀 daemon：68 卡全保留 + offline/reconnecting 横幅 ≤2s 出现。
- 宕机冷刷：SW 快照恢复 68 卡。
- 重启 daemon：~8s 无刷新自动回 live（并列系列最快），live 68 卡。
- 0 页面错误、daemon 日志 0 错误；探针零残留（daemon 停止验证、临时脚本已删）。
- 方法注记：探针内重启 daemon 用 `spawn(..., {detached, stdio:["ignore",log,log]})` + `unref()`，不要用 `execSync("setsid nohup ... &")`——后者的 bash 包装会挂住 execSync 管道导致探针卡死（本轮 2 处探针工具问题已排除，非产品缺陷）。

## 结论

PWA 离线快照与 SSE 断线/重连契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
