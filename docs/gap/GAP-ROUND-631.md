# GAP-ROUND-631：PWA 离线快照 + SSE 韧性复走——契约全部成立，无 P0/P1

日期：2026-08-04
驱动维度：真实测试（round-620 后首次；临时 daemon @ :4633，真实数据 4,230+ 会话）

## 实测结果

- 杀 daemon：78 卡保留 + offline 指示正确出现（SW 注册 1 个）。
- 宕机冷开新页：SW 快照恢复 78 卡 + offline 指示——不是骨架屏。
- 重启 daemon：~6s 无刷新自动回 live（offline 指示消失，79 卡）——本系列最快之一。
- daemon 日志零错误。

## 方法注记

- 探针内重启 daemon 用 `spawn(..., { detached: true, stdio: "ignore" })` + `unref()`；`execSync("setsid nohup ... &")` 在 Playwright 探针进程内会挂住脚本（本轮首个探针即此因卡死，与产品无关）。

## 清理

daemon 杀净（端口复核关闭）、探针脚本/日志/浏览器 profile 删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
