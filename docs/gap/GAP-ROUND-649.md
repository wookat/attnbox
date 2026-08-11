# GAP-ROUND-649：文档新鲜度走查——MATURITY 证据刷新至 rounds 639–648

日期：2026-08-05
驱动维度：文档新鲜度走查（round-638 后首次；README/官网五页/LIMITS/MATURITY 对照 rounds 638–648 证据核漂移）

## 走查结果

- README / 官网五页（quickstart/inbox/hooks/doctor/limits）/ docs/LIMITS.md：无漂移，官网无需重建。
- 唯一漂移：`docs/MATURITY.md` 证据行陈旧（停在 round-638），已刷新至 rounds 639–648 实证：
  - live 规模 ~4,276（迄今最大）；
  - soak +645（RSS 107–152MB @4,275）；
  - axe +641（10 态 0 违规 @4,260+）；
  - 门禁 +643（十面全对含坏 ack body 400 @4,266）；
  - hooks 安装器 +640；采集器 +648（12/12）；PWA/SSE +642（~10s 回 live @4,260+）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
