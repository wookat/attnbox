# GAP-ROUND-797：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-05
驱动维度：安全面 + webhook 通道（round-786 后首次）

## 实测（真实 daemon @4,431+ 会话）

门禁（0.0.0.0 绑定 + ATTNBOX_TOKEN）：
- 无 token 拒绝绑定 0.0.0.0（带明确修复指引）。
- 负例：items / SSE(slim) / ack 无 token 全部 401。
- 正例：query token 与 Bearer 均 200（含 SSE 200）。
- 坏 ack body 400；数字时间戳 400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原（写盘异步，等 ≥2s 后比对）。

webhook（ATTNBOX_WEBHOOK_URL）：
- 启动后对存量 11 waiting 零误 POST（不重放存量）。
- ~8 分钟观察窗 13 POST 10 唯一；3 处重复为真实云会话 waiting→working→waiting 重转换重发，无风暴。

daemon 日志零错误。探针零残留（daemon/receiver 已收口，临时文件已删）。

## 结论

安全面与 webhook 通道契约全部成立，无 P0/P1。纯文档轮。
