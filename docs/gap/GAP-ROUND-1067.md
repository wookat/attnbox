# GAP-ROUND-1067：文档新鲜度走查（README/官网五页/LIMITS/MATURITY 对照 rounds 1057–1066）

日期：2026-08-04（UTC）。round-1056 后首次文档新鲜度轮。结论先行：**README/官网五页/LIMITS 无漂移；唯一漂移为 MATURITY 证据行陈旧，已刷新至 rounds 1057–1066 实证。无 P0/P1。**

## 方法

- 对照面：rounds 1057–1066 十轮已合并 GAP 证据（#1092–#1101）。
- 检查对象：`README.md`、官网五页（quickstart/inbox/hooks/doctor/limits）、`docs/LIMITS.md`、`docs/MATURITY.md`。
- 判定标准：文档声明与最新已合并证据/产品行为是否一致；官网是否需要重建。

## 结果

### 无漂移面

- rounds 1057–1066 全为纯文档轮（零产品源码变更），README/官网五页/LIMITS 所述能力与边界不变，官网无需重建。

### 唯一漂移：MATURITY 证据行陈旧（已刷新）

`docs/MATURITY.md` 刷新内容：

- 表头基准：round 1055 → round 1066（v0.4.8 不变）。
- 安全面：补 round-1061 十面负例首跑全通 @5,451（数字 at 400、台账 md5 逐字节还原 11→12→11、webhook 冷启动 id 集合比对对存量 12 waiting 零重放——30s 窗 0 POST、~6 分钟窗 1 POST 1 unique 为真实新转换、隔离端口全部释放、主 daemon 全程健康）。
- a11y：补 round-1059 双主题 10 态 0 违规 @5,450，Done 满载双主题各 5,404 卡（迄今最大满载审计）。
- 性能/规模：live 面 5,449 → 5,455（迄今最大）；补 round-1063 ~14 分钟 soak @5,452→5,453（API 28/28 200、items==summary.total 恒成立、waiting 6–13 为真实 live 转换忠实透传、RSS 106–162 MB 零泄漏、0 error）。
- 实战验证：hooks 安装器链补 round-1058；采集器链补 round-1066（14/14 @5,455）；PWA 链补 round-1060（6/6 首跑、47 卡保留、真实断线横幅逐字匹配、恢复至 5,451）。

## 结论

- 无 P0/P1；纯文档轮。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
