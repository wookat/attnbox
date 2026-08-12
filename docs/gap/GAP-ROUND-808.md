# GAP-ROUND-808：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook 通道（round-797 后首次）

## 实测（真实 daemon @4,436+ 会话）

门禁（0.0.0.0 绑定）：

- 无 token 拒绝绑定 0.0.0.0（诚实报错并退出）✓。
- items/SSE/ack 无 token 全部 401；query token 与 Bearer 均 200；坏 token 401 ✓。
- 坏 ack body 400；数字时间戳 400 ✓。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原（1,002/1,002 字节）✓。

webhook（loopback + ATTNBOX_WEBHOOK_URL）：

- 启动对存量 5 waiting 零误 POST ✓。
- ~8.5 分钟观察窗 2 POST，均为窗口内真实新转换，无风暴 ✓。
- 两段 daemon 日志零错误 ✓。

方法注记：webhook 载荷为 `{event:"waiting", item}`——接收器须读 `item.id` 而非顶层 `id`（首跑打印 undefined 为探针假设错误，非产品缺陷）。探针零残留。

## 结论

token 门禁与 webhook 通道契约全部成立，无 P0/P1。纯文档轮。
