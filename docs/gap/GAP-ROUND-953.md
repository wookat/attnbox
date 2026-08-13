# GAP-ROUND-953: rounds 942–952 合并回归审计（round-942 后首次）

日期：2026-08-04 ｜ 规模：4,623 会话 ｜ 结论：**合并面（#976–#986）全绿，无 P0/P1**。

## 1. 隔离端口全新 daemon soak（~14 分钟，28 次轮询）

- API 28/28 全程 200 ✅
- `items.length == summary.total` 恒成立（4,623 全程稳定，无回落）✅
- waiting 4→7→6 为真实 live 转换漂移，忠实透传 ✅
- daemon 日志 0 error ✅
- 终态真实 daemon 进程 RSS ~149MB，落在既往 108–161MB 包络内，无泄漏迹象 ✅

## 2. 双主题 smoke（隔离 daemon web UI）

- light/dark 各 40 卡渲染、0 页面/console 错误，4/4 首跑全通 ✅

## 3. 本地测试

- `pnpm test` 99/99 ✅（分支基线 + 轮末复核）

方法注记：① smoke 探针不能用 `networkidle` 等待（SSE 长连接使其永不触发）——改 `domcontentloaded` + 等 `main article, main li` 出现；② soak 的 RSS 采样若用 `pgrep -f | head -1` 会命中 setsid 包装 bash 进程（读数 ~2MB 假象），须核对 node 进程本体。

探针零残留（隔离 daemon 已回收，主 daemon @4820 正常 200）。

## 遗留

无新 P0/P1。

## 验收（Actions 降级门禁）

本地全绿：`pnpm lint` ✓ / `pnpm typecheck` ✓ / `pnpm build` ✓ / `pnpm test` 99 ✓。
