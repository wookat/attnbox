# GAP-ROUND-521：PWA 离线快照 + SSE 韧性复走——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：真实测试（round-510 后首次；临时 daemon @ :4521，真实数据 ~3,973 会话）

## 证据

```text
live 基线：46 卡
杀 daemon：46 卡保留 + offline 指示出现
重启 daemon：无刷新自动回 live，~6s（与 round-510 持平），46 卡不变
宕机冷开（daemon down，同 context 新页）：SW 快照恢复 46 卡 + offline 指示
daemon 日志错误：0（两只 daemon）
```

- 方法注记复核成立（round-510）：execSync 后台拉起 daemon 须分离 stdio（`stdio:"ignore"` + `</dev/null >log 2>&1 &`），否则探针 hang。
- 清理：daemon 杀净、日志/探针脚本删除，零残留。

## 结论

- PWA 离线快照 + SSE 断线/重连韧性契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
