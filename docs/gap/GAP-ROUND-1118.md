# GAP-ROUND-1118：rounds 1107–1117 合并回归审计（soak + 双主题 smoke）

日期：2026-08-04（UTC）。round-1107 后首次运行时回归审计轮。结论先行：**合并面（#1142–#1152）全绿：隔离端口 4966 全新 daemon ~14 分钟 soak @5,505 会话（迄今最大），API 28/28 全程 200、items==summary.total 恒成立、total 无回落（5,505 全程持平）、waiting 6–9 为真实 live 转换忠实透传、daemon 日志 0 error、RSS 115–165MB 落既往包络内零泄漏；双主题 smoke 各 40 卡 0 错误 2/2 全通。无 P0/P1。**

## 审计范围

- 合并面：#1142（ROUND-1107 soak）至 #1152（ROUND-1117 交接文档整备），全部纯文档轮，源码零变更。
- 方法：隔离端口 4966 全新 daemon（`node packages/cli/dist/index.js --port 4966`，真实 node PID 95563 经 /proc 验证），主 daemon 4820 不受影响。基线 main `6488779`（#1152 合并后），门禁 lint/typecheck/build/test 99 全绿后开跑。

## Soak 结果（~14 分钟，30s × 28 轮询）

- `/api/items` 28/28 全程 HTTP 200。
- `items.length == summary.total` 每次采样恒成立，total 5,505 全程持平无回落（迄今最大；开跑前预热窗观测到 5,504→5,505 单调增长）。
- waiting 在 6–9 间波动（6→7→9→8→…→9→8→7），为真实 live 转换忠实透传（非抖动）。
- daemon RSS（真实 node 进程 /proc VmRSS 采样）：115–165MB，落 rounds 1096/1107 包络（105–166MB）内，零泄漏趋势（尾部 116→158MB 属 GC 波动区间、非单调上升）。
- daemon 日志 0 error（grep -ci error == 0）。

## 双主题 smoke

- light / dark 各首页加载（Playwright colorScheme 模拟，waitUntil domcontentloaded + 8s 稳态——SSE 长连接下 networkidle 永不触发，沿用既有方法注记）：各 40 卡（main li 计数）、0 pageerror、0 console error，2/2 全通；light bodyBg rgb(255,255,255) / dark oklch(0.141 …) 主题正确生效。

## 清理

- 隔离 daemon 已 kill（4966 端口已释放），主 daemon 4820 全程健康（items==total 5,506）；ack 台账轮前后 md5 逐字节一致（5166cdf4…）；探针脚本与日志零残留（/tmp 与 a11y 工作目录，不入仓）。

## 遗留

- 无新 P0/P1；P2 台账不变（SSE delta、payload 去重、3k 展开虚拟化、远程审批、presence-aware 通知、Devin project 分组覆盖、waiting 紧迫度排序）。
