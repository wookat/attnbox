# GAP-ROUND-1074：rounds 1063–1073 合并回归审计（soak + 双主题 smoke）

日期：2026-08-17（UTC）。round-1063 后首次运行时回归审计轮。结论先行：**合并面（#1098–#1108）全绿：隔离端口 4995 全新 daemon ~14 分钟 soak @5,459 会话（迄今最大），API 28/28 全程 200、items==summary.total 恒成立（5,459 无回落）、waiting 10–12 为真实 live 转换忠实透传、daemon 日志 0 error、RSS 104–159MB 落既往包络内零泄漏；双主题 smoke 各 46 卡 0 错误 2/2 全通。无 P0/P1。**

## 审计范围

- 合并面：#1098（ROUND-1063 soak）至 #1108（ROUND-1073 交接文档整备），全部纯文档轮，源码零变更。
- 方法：隔离端口 4995 全新 daemon（`node packages/cli/dist/index.js --port 4995`，setsid nohup 绝对路径），主 daemon 4820 不受影响。

## Soak 结果（~14 分钟，30s × 28 轮询）

- `/api/items` 28/28 全程 HTTP 200。
- `items.length == summary.total` 每次采样恒成立，total=5,459 全程无回落（迄今最大）。
- waiting 在 10–12 间波动，为真实 live 转换忠实透传（非抖动）。
- daemon RSS（正确 node 进程 PID 采样）：104–159MB，落 rounds 1052/1063 包络（99–162MB）内，零泄漏趋势。
- daemon 日志 0 error。

## 双主题 smoke

- light / dark 各首页加载：46 卡（li）、0 pageerror、0 console error，2/2 全通；"10 agents are waiting on you · 35 working · 5459 sessions tracked" 与 API 同刻一致。

## 方法注记

- soak 脚本内 `pgrep -f "cli/dist/index.js --port 4995" | head -1` 会先命中包裹的 bash 包装进程（rss≈2MB），非 daemon 本体；RSS 采样须锁定真实 node 进程 PID（本轮已用独立采样器修正，2MB 读数为探针缺陷非产品数据）。
- CLI 无 `start` 子命令：daemon 以 `node packages/cli/dist/index.js --port <n>` 直接启动（`attnbox` 默认行为即启动 daemon）。

## 清理

- 隔离 daemon 已 kill（4995 归 000），主 daemon 4820 全程健康（200）；探针脚本已删除，零残留。

## 遗留

- 无新 P0/P1；P2 台账不变（SSE delta、payload 去重、3k 展开虚拟化、远程审批、presence-aware 通知、Devin project 分组覆盖、waiting 紧迫度排序）。
