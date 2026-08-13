# GAP-ROUND-942 — rounds 931–941 合并回归审计（soak + 双主题 smoke）

日期：2026-08-04。主驱动：round-931 后首次运行时回归审计，覆盖合并面 #965–#975。

## 审计方法

- 隔离端口（:4909）全新 daemon，~14 分钟 soak：每 30s 轮询 `/api/items`，断言 HTTP 200、`items.length == summary.total`，采样 RSS，结束后扫 daemon 日志 error。
- 双主题 smoke（:4910 隔离 daemon）：Playwright light/dark 各一次，卡片选择器 `main article, main li`（round-920 方法注记），断言卡片 >0 且 0 页面/console 错误。
- 本地质量门禁：`pnpm lint && pnpm typecheck && pnpm build && pnpm test`。

## 结果（全部通过，无 P0/P1）

- soak：28/28 全程 200，`items==summary.total` 恒成立，total 4,621→4,622（迄今最大，单调无回落），RSS 108–155MB 包络内平稳零泄漏，daemon 日志 0 error。
- smoke：light/dark 各 52 卡，0 页面/console 错误，2/2 首跑全通。
- 质量门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。

## 结论

Rounds 931–941（#965–#975，全部纯文档轮）合并面无运行时回归。无新 P0/P1；探针零残留（隔离端口 daemon 均已停止）。
