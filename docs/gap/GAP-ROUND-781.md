# GAP-ROUND-781：文档新鲜度走查——MATURITY 证据刷新至 rounds 770–780

日期：2026-08-04
驱动维度：文档新鲜度（round-770 后首次）

## 走查范围与结论

- README / LIMITS：无漂移（诚实边界与通知/webhook 叙事仍与实证一致）。
- 官网五页（quickstart/inbox/hooks/doctor/limits）：无功能性漂移，官网无需重建。
- 唯一漂移：`docs/MATURITY.md` 证据行陈旧，已刷新至 rounds 770–780 实证：
  - live ~4,427 会话（迄今最大）；soak +777（RSS 132–157MB @4,426）。
  - a11y +773（双主题 10 态 0 违规，Done 满载 4,349 / Grouped 4,421 卡迄今最大）。
  - 安全面 +775（十面 sweep @4,419+，含数字时间戳 400 与 loopback 不启用 token 门禁契约；webhook 11 POST 11 唯一零重复）。
  - hooks +772；采集器 +780（10/10）；PWA +774（5/5，~10s，72 卡全保留）。

## 结论

文档与 rounds 770–780 实证一致，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
