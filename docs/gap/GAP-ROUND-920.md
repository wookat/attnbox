# GAP-ROUND-920 — rounds 909–919 合并回归审计（纯文档）

Round 920. 主驱动：合并面（#943–#953）运行时回归审计——隔离端口全新 daemon soak + 双主题 smoke（round-909 后首次）。证据日期：2026-08-04。

## Soak（隔离端口 4905，全新 daemon，~14 分钟）

- API 28/28 全程 200，`items.length == summary.total` 恒成立。
- 规模 @4,589→4,598 会话（迄今最大）。
- RSS 112–159MB，包络内平稳，零泄漏趋势。
- daemon 日志 0 error / 0 warn / 0 retry。
- 观察项（非缺陷）：iter-17 出现 total 4,590→4,588 一次 -2 后回升至 4,595——为云端会话真实下线的 live 漂移，非深爬失败截断（round-832 截断特征为量级坍缩 4,474→206；本次 0 error 且立即回升），忠实透传符合契约。

## 双主题 smoke（隔离端口 4906）

- light/dark 各 59 卡渲染，0 pageerror、0 console error。
- 方法注记：首跑 2 处假 FAIL 为探针问题——卡片选择器应为 `main article, main li`（非 `.card`），且须等 `summary.total > 0`（daemon 冷启动全量爬取 ~1 分钟）后再断言；修正后复走全通，非产品缺陷。

## 质量门禁

`pnpm lint && pnpm typecheck && pnpm build && pnpm test` 全绿（99 测试）。

## Verdict

无 P0/P1。纯文档轮，无 changeset。探针零残留（隔离 daemon 已终止）。
