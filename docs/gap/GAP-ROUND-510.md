# GAP-ROUND-510：PWA 离线快照 + SSE 韧性复走——契约全部成立，无 P0/P1

日期：2026-08-05
驱动维度：PWA/SSE 韧性（round-499 后首次；临时 daemon @ :4488，真实数据 3,96x 会话）

## 证据

```text
phase1 live                → 47 卡（首爬完成 + SW 安装）
phase2 杀 daemon（12s 后）  → 47 卡全保留 + offline 指示出现
phase3 宕机冷开新标签页     → 47 卡（SW 快照恢复，非永久骨架屏）
phase4 重启 daemon         → 无刷新自动回 live（复测计时 ~6s），offline 指示消失
  （首测脚本 execSync 继承 stdio 被后台 daemon 挂住属探针缺陷，非产品问题；
   页面本身早已自动回 live——复测用 stdio:"ignore" 分离后计时 ~6s）
```

- 方法注记（新）：探针内用 `execSync` 后台拉起 daemon 时必须 `</dev/null` + `stdio:"ignore"`，否则 execSync 等继承的 stdout 管道关闭而永挂——这是探针陷阱，产品行为不受影响。
- 清理：daemon 杀净（连接拒绝复测）、探针脚本/日志删除、CDP 残留 service worker 定向关闭（residual 0）。

## 结论

- PWA 离线快照 + SSE 断线/重连契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
