# GAP-ROUND-1089：文档新鲜度走查（README/官网五页/LIMITS/MATURITY 对照 rounds 1079–1088）

日期：2026-08-04（UTC）。round-1078 后首次文档新鲜度轮。结论先行：**README/官网五页/LIMITS 无漂移；唯一漂移为 MATURITY 证据行陈旧，已刷新至 rounds 1079–1088 实证。无 P0/P1。**

## 方法

- 对照面：README.md、官网五页（quickstart/inbox/hooks/doctor/limits）、docs/LIMITS.md、docs/MATURITY.md。
- 证据基准：rounds 1079–1088 已合并 GAP 记录（数据面 1079、CLI 1080、a11y 1081、PWA/SSE 1082、门禁/webhook 1083、交接 1084、soak 1085、竞品 1086、分诊 1087、采集器 1088）。

## 结果

- README/官网五页/LIMITS：逐项核对无事实漂移（rounds 1079–1088 全为纯文档轮，功能面/边界面无变化，官网无需重建）。
- MATURITY 漂移已刷新：
  - 表头基准 1077→1088。
  - Performance at scale：live ~5,463→~5,472（迄今最大）；补 round-1085 soak（@5,467→5,469，API 28/28 200、total 单调无回落、waiting 9–13 真实透传、RSS 108–163MB 落既往包络、0 error）。
  - Real-world validation：5,463→5,472 会话组织；hooks 链补 1080；采集器链补 1088（14/14 @5,472）；PWA 链补 1082（6/6 恢复至 5,466，迄今最大）。
  - Security posture：补 round-1083（10/10 首跑全通、台账 19→20→19 md5 逐字节还原、冷启动对 6 存量零重放、~6 分钟窗 0 POST 诚实零通知）。
  - Mobile-first UI（a11y）：补 round-1081（十态 0 违规 @5,466，Done 满载 light 5,426/dark 5,424，迄今最大满载审计）。

## 结论

- 无 P0/P1；纯文档轮。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
