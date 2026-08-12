# GAP-ROUND-786：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook（round-775 后首次）

## 实测（真实 daemon @4,427+ 会话）

- 无 token 拒绝绑定 `0.0.0.0`（诚实报错并退出，round-775 契约不变）。
- token 门禁九面全对（0.0.0.0 绑定）：items 无 token/坏 token 401、query/Bearer 200；SSE 无 token 401、token+slim 200；ack 无 token 401、坏 body 400、数字时间戳 400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，un-ack 后与基线逐字节还原（等待 ≥1.5s 写盘，round-753 注记）。
- webhook（存量 waiting 零误 POST 前提下）~8 分钟观察窗：5 POST 5 唯一零重复，无风暴；payload 顶层 {event,item} 契约不变。
- daemon 日志零错误。

## 结论

安全面与 webhook 契约全部成立，无 P0/P1。纯文档轮，探针零残留（daemon/webhook 收口、台账逐字节还原）。
