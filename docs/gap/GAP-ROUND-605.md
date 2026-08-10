# GAP-ROUND-605：文档新鲜度走查——MATURITY 证据刷新至 rounds 594–604，无 P0/P1

日期：2026-08-10
驱动维度：文档新鲜度走查（round-594 后首次；对照 rounds 594–604 证据核漂移）

## 核查结果

- README / 官网五页（quickstart/inbox/hooks/doctor/limits）/ LIMITS：无漂移（无过时数字或已废弃语义，官网无需重建）。
- 唯一漂移：`docs/MATURITY.md` 证据行陈旧，已刷新至 rounds 594–604 实证：
  - live ~4,149 会话（迄今最大）；
  - soak 系列 +601 @4,142（RSS 92–160MB 包络不变）；
  - axe 系列 +597（Done 全量 4,058/4,060 + Grouped 4,132 整页审计）；
  - 门禁系列 +599（九面含拒绝无 token 绑定）；
  - hooks 安装器 +596、采集器实弹 +604、PWA/SSE +598（重启 ~5s 回 live）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
