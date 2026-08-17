# GAP-ROUND-1096：rounds 1085–1095 合并回归审计（soak + 双主题 smoke）

日期：2026-08-04（UTC）。round-1085 后首次运行时回归审计轮。结论先行：**合并面（#1120–#1130）全绿：隔离端口 4966 全新 daemon ~14 分钟 soak @5,482→5,483 会话（迄今最大），API 28/28 全程 200、items==summary.total 恒成立、total 无回落（5,482→5,483 单调增长）、waiting 5–9 为真实 live 转换忠实透传、daemon 日志 0 error、RSS 105–165MB 落既往包络内零泄漏；双主题 smoke 各 40 卡 0 错误 2/2 全通。无 P0/P1。**

## 审计范围

- 合并面：#1120（ROUND-1085 soak）至 #1130（ROUND-1095 交接文档整备），全部纯文档轮，源码零变更。
- 方法：隔离端口 4966 全新 daemon（`node packages/cli/dist/index.js --port 4966`，nohup 绝对路径，真实 node PID 43530 经 `ss -ltnp` 验证），主 daemon 4820 不受影响。审前 `pnpm build` 全新构建（BUILD=0）。

## Soak 结果（~14 分钟，30s × 28 轮询）

- `/api/items` 28/28 全程 HTTP 200。
- `items.length == summary.total` 每次采样恒成立，total 5,482→5,483 单调增长无回落（迄今最大）。
- waiting 在 5–9 间波动（5→6→8→9→8），为真实 live 转换忠实透传（非抖动）。
- daemon RSS（真实 node 进程 /proc VmRSS 采样）：105–165MB，落 rounds 1063/1074/1085 包络（104–163MB）近旁（上界 +2MB 为采样即时波动），零泄漏趋势（尾部未单调上升）。
- daemon 日志 0 error（grep -ci error == 0）。

## 双主题 smoke

- light / dark 各首页加载（Playwright colorScheme 模拟，waitUntil load——SSE 长连接下 networkidle 永不触发，方法注记）：各 40 卡、0 pageerror、0 console error，2/2 全通。

## 清理

- 隔离 daemon 已 kill（4966 端口已释放），主 daemon 4820 全程健康（200）；探针脚本与日志零残留。

## 遗留

- 无新 P0/P1；P2 台账不变（SSE delta、payload 去重、3k 展开虚拟化、远程审批、presence-aware 通知、Devin project 分组覆盖、waiting 紧迫度排序）。
