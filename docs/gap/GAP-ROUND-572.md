# GAP-ROUND-572：文档新鲜度走查——唯一漂移 MATURITY 证据行陈旧，已刷新至 rounds 561–571 实证

日期：2026-08-10
驱动维度：文档新鲜度走查（round-561 后首次；README/官网五页/LIMITS/MATURITY 对照 rounds 561–571 证据核漂移）

## 走查结果

- README：无漂移（叙事与当前能力一致）。
- 官网五页（quickstart/inbox/hooks/doctor/limits）：无漂移，官网无需重建。
- `docs/LIMITS.md`：无漂移（per-source 边界仍准确）。
- `docs/MATURITY.md`：**唯一漂移**——证据行停在 round-561。已刷新：
  - 顶行推进至 round-572；
  - live 规模 4,024 → 4,062（迄今最大）；
  - soak 序列补 4,045（round-568）；
  - axe 序列补 round-564（Done ~3,987 / Grouped 4,036 全量整页）；
  - token 门禁/webhook 序列补 round-566；
  - CLI 序列补 round-563；采集器序列补 round-571；PWA/SSE 序列补 round-565。

## 结论

- 无 P0/P1。纯文档轮：仅 `docs/MATURITY.md` 证据行刷新 + 本 GAP，不改产品源码、不加 changeset。
