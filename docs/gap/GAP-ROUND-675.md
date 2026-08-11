# GAP-ROUND-675：PWA 离线快照 + SSE 韧性复走——契约全部成立

日期：2026-08-04
驱动维度：PWA 离线快照 + SSE 断线/重连韧性（round-664 后首次；@4,295+ 会话规模）

## 证据

- 基线：65 卡在屏 + live 指示。
- 杀 daemon：65 卡全数保留 + offline 指示 + "daemon lost" 横幅。
- 宕机冷开：SW 快照恢复 65 卡（grayscale 变暗态计数快照前后一致）。
- 重启 daemon：~7s 无刷新自动回 live（本系列第二快，仅次于 rounds 345/356 的 ~3s）。
- 0 页面错误、daemon 日志零错误。

## 方法注记（新）

- 探针内重启 daemon 若用 `execSync("nohup … &")` 且不加 `stdio: "ignore"`，子 daemon 继承 stdout 管道导致 execSync 永久阻塞（本轮首跑探针挂死即此因，非产品缺陷）；须加 `stdio: "ignore"`（或沿用 round-631 的 spawn(detached)+unref()）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。探针零残留。
