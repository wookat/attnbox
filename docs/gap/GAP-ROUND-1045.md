# GAP-ROUND-1045：文档新鲜度走查（README/官网五页/LIMITS/MATURITY 对照 rounds 1035–1044）

日期：2026-08-04（UTC）。round-1034 后首次文档新鲜度轮。结论先行：**README/官网五页/LIMITS 无漂移；唯一漂移为 MATURITY 证据行陈旧，已刷新至 rounds 1035–1044 实证。无 P0/P1。**

## 方法

- 对照面：rounds 1035–1044 十轮已合并 GAP 证据（#1070–#1079）。
- 检查对象：`README.md`、官网五页（quickstart/inbox/hooks/doctor/limits）、`docs/LIMITS.md`、`docs/MATURITY.md`。
- 判定标准：文档声明与最新已合并证据/产品行为是否一致；官网是否需要重建。

## 结果

### 无漂移面

- rounds 1035–1044 全为纯文档轮（零产品源码变更），README/官网五页/LIMITS 所述能力与边界不变，官网无需重建。

### 唯一漂移：MATURITY 证据行陈旧（已刷新）

`docs/MATURITY.md` 刷新内容：

- 表头基准：round 1033 → round 1044（v0.4.8 不变）。
- 安全面：补 round-1039 十面负例 @5,433+（数字 at 400、台账 md5 逐字节还原 11→12→11、webhook 冷启动对 7 存量零重放 30s 窗 0 POST、~6.5 分钟窗 4 POSTs 4 unique 无风暴、隔离 daemon 日志 0 error）。
- a11y：补 round-1037 双主题 10 态 0 违规 @5,435+，Done 满载 5,388/5,386（迄今最大满载审计）。
- 性能/规模：live 面 5,434 → 5,438（迄今最大）；补 round-1041 ~14 分钟 soak @5,437→5,438（API 28/28 200、items==summary.total 恒成立、RSS 117–167 MB 零泄漏、0 error）及 SSE 长连接使 Playwright `networkidle` 永不满足的方法注记。
- 实战验证：hooks 安装器链补 round-1036；采集器链补 round-1044（14/14 @5,438）；PWA 链补 round-1038（6/6、49 卡保留、恢复至 5,436，含 "offlineShell" 词检假阳性方法注记）。

## 结论

- 无 P0/P1；纯文档轮。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
