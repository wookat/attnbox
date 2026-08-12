# GAP-ROUND-819：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook 通道（round-808 后首次）

## 实测（真实 daemon @4,438+ 会话）

### --host token 门禁（多面全对）

- 无 token 拒绝绑定 0.0.0.0（醒目安全提示）。
- 带 token 绑定后九面全对：items/SSE/ack 无 token 401；query token 200；Bearer 200；坏 token 401；坏 ack body 400；数字时间戳 400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原（cmp 一致）。

### waiting webhook（零重放 + 零风暴）

- 独立 daemon（ATTNBOX_WEBHOOK_URL 指向本地接收器）冷启动后对存量 13 waiting 零误 POST。
- ~8.5 分钟观察窗 3 POST、3 唯一 ID，均为真实新转换，无重复无风暴。
- daemon 日志零错误。

探针零残留（沙箱 daemon/接收器已收口，主 daemon 200 正常）。

## 结论

安全面与 webhook 通道契约全部成立，无 P0/P1。纯文档轮。
