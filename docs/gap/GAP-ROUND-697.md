# GAP-ROUND-697：PWA 离线快照 + SSE 韧性复走——6/6 全通

日期：2026-08-04
驱动维度：PWA 离线快照 + SSE 断线/重连韧性复走（round-686 后首次）

## 证据（@4,312+ 会话）

- 杀 daemon 后 73 卡全保留 + offline 指示正常出现。
- 宕机期间冷开新页：SW 快照恢复 73 卡。
- 重启 daemon 后 ~9s 无刷新自动回 live。
- 0 页面错误、daemon 日志零错误。

方法注记（探针侧，非产品缺陷）：`lsof -ti :<port>` 在本机不可用（空输出），杀 daemon 须用 `pkill -f 'dist/index[.]js --port <port>'`（模式加字符类避免 pkill 匹配到执行它的 shell 自身）——首跑 offline 假 FAIL 即因 daemon 实际未被杀死。

探针零残留（daemon 已停、临时脚本/profile 已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
