# GAP-ROUND-957: 文档新鲜度走查（README/官网五页/LIMITS/MATURITY 对照 rounds 947–956）

日期：2026-08-04。round-946 后首次文档新鲜度轮。结论先行：**README/官网五页/LIMITS 无漂移；唯一漂移为 MATURITY 证据行陈旧，已刷新至 rounds 947–956 实证。无 P0/P1。**

## 走查结果

| 文档 | 结论 |
|------|------|
| README.md | 无漂移（功能面 rounds 947–956 无变化，全为纯文档轮） |
| 官网五页（index/quickstart/inbox/doctor/limits） | 无漂移，官网无需重建 |
| docs/LIMITS.md | 无漂移（边界契约无变化） |
| docs/MATURITY.md | **陈旧** —— 证据行停在 rounds 936–945；已刷新 |

## MATURITY 刷新内容（rounds 947–956 实证）

- 表头：round 945 → round 956。
- 安全面：+round-940（10/10 @4,621，webhook id 集合比对零重放，5 POSTs 5 unique）、+round-951（10/10 @4,623，台账 md5 逐字节还原，1 POST 1 unique）。
- a11y：+round-949（双主题 10 态 0 违规 @4,622+，Done 满载各 4,581 卡迄今最大）。
- 规模：live ~4,622 → ~4,624（迄今最大）；soak +round-953（隔离端口 ~14 分钟 @4,623，API 28/28 200，真实进程 RSS ~149MB 包络内，0 error）。
- hooks 安装器负例：+round-948。
- 本地采集器：+round-956（14/14 首跑全对，零假 FAIL）。
- PWA/SSE：+round-950（5/5，41 卡全保留，全量 API 恢复至 4,623）。

## 结论

- 纯文档轮，无源码改动；无 P0/P1。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准（GitHub Actions 保持禁用）。
