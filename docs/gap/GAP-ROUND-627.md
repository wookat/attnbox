# GAP-ROUND-627：文档新鲜度走查——唯一漂移 MATURITY 证据行，已刷新至 rounds 616–626，无 P0/P1

日期：2026-08-04
驱动维度：文档新鲜度走查（round-616 后首次；README/官网五页/LIMITS/MATURITY 对照 rounds 616–626 证据核漂移）

## 核查结果

- README：叙事无漂移（零侵入发现、状态模型、LIMITS 链接均与现状一致）。
- 官网五页（quickstart/inbox/hooks/doctor/limits）：无轮次绑定数字、无漂移，官网无需重建。
- docs/LIMITS.md：边界描述无漂移。
- docs/MATURITY.md：唯一漂移——证据行停在 round-616，已刷新至 rounds 616–626 实证：
  - live ~4,230 迄今最大（round-625）；
  - soak +623 @4,222（RSS 105–162MB）；
  - axe +619（Done 惰性全量 4,112/4,114、Grouped 4,204/4,208 卡 @~4,200+）；
  - 门禁/webhook +621（九面 + 拒绝无 token 绑定）；
  - hooks installer +618；
  - 采集器 +626（13/13 fixture 实弹）；
  - PWA/SSE +620（~8s 回 live @~4,200+）。

## 结论

- 无 P0/P1。仅 `docs/MATURITY.md` 证据刷新 + 本 GAP 文档；不改产品源码、不加 changeset。
