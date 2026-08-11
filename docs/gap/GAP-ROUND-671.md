# GAP-ROUND-671：文档新鲜度走查——MATURITY 证据刷新至 rounds 660–670

日期：2026-08-04
驱动维度：文档新鲜度走查（round-660 后首次；README/官网五页/LIMITS/MATURITY 对照 rounds 660–670 证据核漂移）

## 核查结果

- README、官网五页（index/quickstart/inbox/hooks/doctor/limits）、`docs/LIMITS.md`：无漂移（官网无需重建）。
- 唯一漂移：`docs/MATURITY.md` 证据行陈旧（停在 round-660），已刷新至 rounds 660–670 实证：
  - live 规模 ~4,279 → ~4,288（迄今最大）；
  - a11y 复审 +663（发现并修复状态依赖的已 ack 卡片对比度 P1：opacity-50 → grayscale，回归 10 态 0 违规 @4,283）；
  - soak +667（RSS 106–159MB @4,287）；
  - 门禁/风暴守卫 +665（十面全对）；hooks 安装器 +662；
  - 采集器实弹 +670（13/13）；PWA/SSE 韧性 +664（grayscale 变暗态经快照恢复保持）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
