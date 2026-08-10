# GAP-ROUND-579：rounds 568–578 合并回归审计——soak/双主题 smoke 全绿，无 P0/P1

日期：2026-08-10
驱动维度：运行时回归审计（round-568 后首次；临时 daemon @ :4579，真实数据 4,091→4,097 会话——迄今最大）

## 证据

### daemon soak（~14 分钟，真实 PID 采样）

```text
RSS 113–152MB，包络内平稳（历史包络 92–160MB），无单调增长
daemon 日志错误：0
```

### 双主题 web smoke

```text
dark: 74 卡 0 页错误 0 console error
light: 74 卡 0 页错误 0 console error
```

- 回归：main @ #612 后 `pnpm test` = 98/98。
- 清理：daemon 杀净（连接拒绝复测）、脚本/日志删除，零残留。
- 探针注记（既有坑复核）：`pgrep -f "index.js --port <N>"` 会同时命中 spawning bash——RSS 采样必须选真实 node 进程 PID（本轮首个采样窗因取到 bash PID 读 0MB 作废重跑）。

## 结论

- rounds 568–578 合并面无运行时回归。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
