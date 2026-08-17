# GAP-ROUND-1001: 文档新鲜度走查（round-990 后首次）

日期：2026-08-04。主驱动：README/官网五页/LIMITS/MATURITY 对照 rounds 991–1000 证据核漂移。结论先行：**README/官网/LIMITS 无漂移；唯一漂移 MATURITY 证据行陈旧，已刷新。无 P0/P1**。

## 核查面

| 文档 | 结论 |
|------|------|
| README | 无漂移（rounds 991–1000 全为纯文档轮，功能面未变） |
| 官网五页（quickstart/inbox/hooks/doctor/limits） | 无漂移，官网无需重建 |
| docs/LIMITS.md | 无漂移，边界契约与现状一致 |
| docs/MATURITY.md | 证据行陈旧 → 已刷新（见下） |

## MATURITY 刷新内容

- 表头 round 989 → round 1000；live 规模 ~5,385 → ~5,409（迄今最大）。
- 安全面：+995 10/10 首跑 @5,398（数字时间戳 400、台账 11→12→11 逐字节 md5 还原、webhook 冷启动对存量 24 waiting 零重放、4 POSTs 4 unique、daemon 0 error）。
- a11y：+993 双主题 10 态 0 违规 @5,390+，Done 满载 5,311/5,310（迄今最大满载审计）。
- soak：+997 ~14 分钟 @5,405→5,407（迄今最大），API 28/28 200、RSS 97–160MB 零泄漏、0 error。
- 采集器：+1000 14/14 首跑全对（零假 FAIL 系列延至 989/1000）。
- hooks 安装器负例：系列补 981/992。
- PWA：+994 5/5（82 卡 kill/冷刷全保留，恢复至 5,398）。

## 结论

无 P0/P1；本轮为纯文档（MATURITY 刷新 + 本报告）。继续循环。
