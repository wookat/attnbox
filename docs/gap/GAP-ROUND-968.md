# GAP-ROUND-968：文档新鲜度走查（round-957 后首次）

日期：2026-08-04。结论先行：**README / 官网五页 / LIMITS 无漂移；唯一漂移为 MATURITY 证据行陈旧，已刷新至 rounds 958–967 实证。**

## 核查面

- README：#1000 已在上一轮合并统一价值主张行，与现状一致，无漂移。
- 官网五页（quickstart / inbox / hooks / doctor / limits）：rounds 958–967 全为纯文档轮，无功能面变化，官网无需重建。
- docs/LIMITS.md：各源置信度与运行边界与现状一致，无漂移。
- docs/MATURITY.md：证据行停在 round-956，已刷新。

## MATURITY 刷新内容（rounds 958–967 实证）

- 表头刷新至 round 967；
- Performance at scale：live ~4,624 → **~5,339 会话（迄今最大）**；补 round-964 soak（RSS 103–153 MB @4,628、API 28/28 200、items==summary.total 恒成立、0 error）；
- Security posture：补 round-962 10/10 首跑（numeric-timestamp 400、byte-exact 13→14→13、webhook 冷启动对存量 12 waiting 零重放、~6 分钟 0 POST 无风暴）；
- Mobile-first UI：补 round-960 axe 十态 0 违规（Done 满载 4,576/4,570 卡）；
- Real-world validation：dogfood 规模刷新至 5,339；hooks 安装器负例轮补 959；三采集器实弹轮补 967（连续 14/14 零假 FAIL）；PWA 补 round-961（~4s 重连并列最快、52 卡全保留、恢复至 4,625）。

## 结论

- 无 P0/P1；纯文档轮；
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准。
