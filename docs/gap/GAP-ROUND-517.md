# GAP-ROUND-517：文档新鲜度走查——MATURITY 证据刷新至 rounds 506–516

日期：2026-08-10
驱动维度：文档新鲜度（round-506 后首次；README/官网五页/LIMITS/MATURITY 对照 rounds 506–516 证据）

## 核查

- README / `docs/LIMITS.md`：无漂移（版本号、能力边界、per-source 语义均与现状一致）。
- 官网五页（/quickstart /inbox /hooks /doctor /limits）全部 200，内容无需重建。
- 唯一漂移：`docs/MATURITY.md` 证据行陈旧（停在 round 506），已刷新至 rounds 506–516 实证：
  - 表头 round 506 → 517；live 规模 ~3,957 → ~3,967（迄今最大）；
  - soak 序列补 +513 @3,967；token 门禁/webhook 序列补 +511；axe 序列补 +509；
  - hooks installer 序列补 +508；三采集器实弹序列补 +516；PWA/SSE 韧性序列补 +510。

## 结论

- 除 MATURITY 证据行外无漂移。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
