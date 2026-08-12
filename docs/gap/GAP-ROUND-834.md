# GAP-ROUND-834：分诊全流程 UX 走查（round-823 后首次）

日期：2026-08-04。主驱动：分诊全流程 UX 走查（搜索→过滤→ack all→反 ack + 键盘链）。纯文档轮，无 P0/P1。

## 走查环境

- main @ ROUND-833 合并面，daemon 实弹 @4,481 会话（summary.total==items 恒成立，waiting 13）。
- Playwright + 本机 Chrome headless，探针位于仓库外（`~/a11y/ux834.tmp.mjs`），走查后已清理。

## 契约核验（10/10 首跑全通）

1. 默认态渲染 32 卡（slim SSE 惰性，无全量 fetch）。
2. Needs you 过滤 → 11 卡（≤ 默认卡数）。
3. 惰性搜索恰好 1 次 `/api/items` 全量 fetch，`attnbox` 3 命中。
4. 负例搜索（无此词）诚实空态 0 卡。
5. 键盘 j 选中 + e ack：台账 13→14。
6. API 反 ack（`{"id":…,"at":null}`）后台账与基线逐字节还原（1,002 bytes）。
7. ✓ all done：台账 13→27（14 项 waiting/attention 全 ack）。
8. 按基线快照逐项 API 反 ack 后逐字节还原。
9. `?` 帮助面板正常浮出。
10. 全程 0 页面 error / 0 console error。

## 结论

- rounds 824–833 合并面上分诊全流程契约全部成立，无回归。
- 无产品 P0/P1。本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（99 测试）全绿。
