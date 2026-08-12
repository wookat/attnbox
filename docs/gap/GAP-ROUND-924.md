# GAP-ROUND-924 — 文档新鲜度走查（纯文档）

Round 924. 主驱动：README/官网五页/LIMITS/MATURITY 对照 rounds 914–923 证据核漂移——round-913 后首次。证据日期：2026-08-04。

## 走查结果

- README、官网五页（index/quickstart/inbox/hooks/doctor/limits）、docs/LIMITS.md：无漂移，官网无需重建。
- 唯一漂移：docs/MATURITY.md 证据行陈旧（停在 round-913），已刷新至 rounds 914–923 实证：
  - live ~4,599 会话（迄今最大）。
  - 安全面 +918：10/10 @4,582，数字 at 400、台账 13→14→13 逐字节还原、webhook 冷启动 id 集合比对零重放（16 存量）、4 POST 4 唯一。
  - a11y +916：Done 满载双主题 4,526/4,527 卡迄今最大，10 态 0 违规。
  - soak +920：RSS 112–159MB @4,589→4,598 隔离端口 0 error，一次 total −2 后回升确认为真实云端下线非截断。
  - hooks +915；采集器 +923 14/14 零假 FAIL；PWA +917 5/5 ~7s 57 卡全保留、API 恢复 4,582。

## Verdict

无 P0/P1。纯文档轮（仅 MATURITY 证据刷新），无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
