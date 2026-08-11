# GAP-ROUND-775：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook 通道（round-764 后首次）

## 证据（本地 daemon @4775，真实数据 4,419+ 会话）

- 无 token 拒绝绑定 0.0.0.0（退出码 1，诚实风险提示）。
- token 门禁十面全对（0.0.0.0 绑定 + token）：items/SSE query+Bearer 正负例 401/200、坏 ack body 400、无 token ack 401、Unix 毫秒数字时间戳 400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原（1,002 字节）。
- 方法注记确认：loopback（127.0.0.1）绑定不启用 token 门禁为文档化契约（cli `!loopback && token` 才传入 daemon），首跑 401 负例"失败"为探针绑定 loopback 所致，非产品缺陷。
- webhook ~8 分钟窗口：11 POST 11 唯一零重复、无风暴，payload 顶层 {event,item} 契约不变；对存量 waiting 零误 POST。
- daemon 日志零错误；探针零残留（daemon/接收器收口、端口 DOWN、临时日志已删）。

## 结论

安全面与 webhook 通道契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
