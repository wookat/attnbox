# GAP-ROUND-1012: 文档新鲜度走查（round-1001 后首次）

日期：2026-08-17。基线：main `bf11e3d`（#1046 合并后）。结论先行：**README/官网五页/LIMITS 无漂移；唯一漂移为 MATURITY 证据行陈旧，已刷新至 rounds 1002–1011 实证。无 P0/P1。**

## 走查范围与结论

| 面 | 结论 |
|---|---|
| README | 无漂移（rounds 1002–1011 全为纯文档轮，无功能/边界变更） |
| 官网五页（quickstart/inbox/hooks/doctor/limits） | 无漂移，无需重建 |
| docs/LIMITS.md | 无漂移 |
| docs/MATURITY.md | 证据行陈旧 → 已刷新（本 PR 唯一实质变更） |

## MATURITY 刷新内容

- 表头：round 1000 → round 1011。
- 规模：live ~5,409 → ~5,420 会话（迄今最大，round-1011 实测）。
- 安全面：补 round-1006 十面负例 @5,414（拒绝无 token 绑定 0.0.0.0、401/400 负例、真实 ID ack/un-ack 台账 11→12→11 md5 逐字节还原、webhook 冷启动对存量 17 waiting 零重放、3 POSTs 3 unique）。
- a11y：补 round-1004 双主题 10 态 0 违规 @5,412+，Done 满载 5,348/5,349 卡（迄今最大满载审计）。
- 规模/soak：补 round-1008 ~14 分钟隔离端口 soak @5,417（API 28/28 200、items==summary.total 恒成立、RSS 104–165MB、0 error）。
- 采集器：live-fire 链补 round-1011（14/14 首跑全对 @5,420）。
- PWA：补 round-1005（5/5，63 卡快照保全、恢复至 5,413）。
- hooks 安装器负例链补 round-1003。

## 证据

- rounds 1002–1011 GAP 文档均在 `docs/gap/`（#1037–#1046 已合并）。
- 本地门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。
