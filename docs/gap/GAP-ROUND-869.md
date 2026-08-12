# GAP-ROUND-869 — 文档新鲜度走查

Round 869. 主驱动：文档新鲜度（round-858 后首次），README/官网五页/
LIMITS/MATURITY 对照 rounds 858–868 证据核漂移。

## 核对结果

- README、官网五页（quickstart/inbox/hooks/doctor/limits）无漂移，
  官网无需重建。
- LIMITS 无漂移：深爬失败回退契约、slim SSE、webhook 边界均仍准确。
- 唯一漂移：MATURITY 证据行陈旧（停在 round-858），已刷新至
  rounds 859–868 实证：
  - live ~4,519 会话（迄今最大，本轮实测 API total=4,524）；
  - soak +865：RSS 113–163MB @4,515→4,519、API 28/28 200、
    items==summary.total 恒成立、total 单调爬升无截断回归；
  - a11y +861：Done 满载双主题各 4,445 卡（迄今最大）0 违规；
  - 安全面 +863：非 loopback 绑定八面全对 + 台账逐字节还原
    13→14→13 + webhook 冷启动零误 POST、11 POST 11 唯一零重放；
  - hooks +860、采集器 +857/868 14/14 零假 FAIL、
    PWA +862 5/5 ~7s 66 卡全保留。

## Verdict

无 P0/P1，唯一漂移为 MATURITY 证据行，已修。其余文档面无漂移。
