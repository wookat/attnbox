# GAP-ROUND-642：PWA 离线快照 + SSE 韧性复走——契约全部成立

日期：2026-08-05
驱动维度：PWA 离线快照 + SSE 断线/重连韧性（round-631 后首次）

## 证据（@4,260+ 会话，迄今最大规模级别）

- 杀 daemon：66 卡全部保留 + offline 指示出现（无白屏、无骨架回退）。
- 宕机冷开：新标签页从 SW 快照恢复 66 卡（daemon 完全不在线）。
- 重启 daemon（spawn detached + unref）：~10s 内无刷新自动回 live（5s 轮询粒度），卡片 66 保持一致。
- daemon 日志错误计数 0；探针零残留（daemon 已杀、临时脚本/日志已删）。
- 方法注记：探针内 `execSync("pkill -f 'index.js …'")` 会匹配自身 sh 命令行导致 SIGTERM 自杀，模式须用 `[i]ndex.js` 转义（本轮首跑即此假故障，非产品缺陷）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
