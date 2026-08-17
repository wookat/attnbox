# GAP-ROUND-1085：rounds 1074–1084 合并回归审计（soak + 双主题 smoke）

日期：2026-08-04（UTC）。round-1074 后首次运行时回归审计轮。结论先行：**合并面（#1109–#1119）全绿：隔离端口 4989 全新 daemon ~14 分钟 soak @5,467→5,469 会话（迄今最大），API 28/28 全程 200、items==summary.total 恒成立、total 无回落（5,467→5,469 单调增长）、waiting 9–13 为真实 live 转换忠实透传、daemon 日志 0 error、RSS 108–163MB 落既往包络内零泄漏；双主题 smoke 各 42 卡 0 错误 2/2 首跑全通。无 P0/P1。**

## 审计范围

- 合并面：#1109（ROUND-1074 soak）至 #1119（ROUND-1084 交接文档整备），全部纯文档轮，源码零变更。
- 方法：隔离端口 4989 全新 daemon（`node packages/cli/dist/index.js --port 4989`，setsid nohup 绝对路径），主 daemon 4820 不受影响。审前 `pnpm build` 全新构建。

## Soak 结果（~14 分钟，30s × 28 轮询）

- `/api/items` 28/28 全程 HTTP 200。
- `items.length == summary.total` 每次采样恒成立，total 5,467→5,468→5,469 单调增长无回落（迄今最大）。
- waiting 在 9–13 间波动，为真实 live 转换忠实透传（非抖动）。
- daemon RSS（真实 node 进程 PID 采样，round-1074 方法注记前置采用）：108–163MB，落 rounds 1052/1063/1074 包络（99–163MB）内，零泄漏趋势。
- daemon 日志 0 error。

## 双主题 smoke

- light / dark 各首页加载（Playwright colorScheme 模拟）：42 卡（li[id^="item-"]）、0 pageerror、0 console error，2/2 首跑全通；light bg 纯白、dark bg oklch 深色，主题切换生效。

## 清理

- 隔离 daemon 已 kill（4989 归 000），主 daemon 4820 全程健康（200）；探针脚本零残留。

## 遗留

- 无新 P0/P1；P2 台账不变（SSE delta、payload 去重、3k 展开虚拟化、远程审批、presence-aware 通知、Devin project 分组覆盖、waiting 紧迫度排序）。
