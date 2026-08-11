# GAP-ROUND-764：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook 通道（round-753 后首次）

## 证据（daemon --host 0.0.0.0 @4764 + 本地 webhook sink）

- 无 token 拒绝绑定 0.0.0.0（明确警告文案）；`--host` 缺参可读报错。
- token 门禁多面全对：items/SSE noauth 401、query token 200、Bearer 200、坏 token 401、ack noauth 401、坏 ack body（Unix 毫秒数）400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，un-ack 后与基线逐字节还原（≥1.5s 等写盘，round-753 注记）。
- webhook 对存量 waiting 零误 POST（启动后静默期无风暴）；~8.5 分钟窗口 12 POST 10 唯一，2 处重复均为真实「waiting→working→waiting」重转换重发（round-720 同类档案行为），无风暴。
- daemon 日志零错误 @4,398+ 会话；探针零残留（daemon/sink 已收口、临时目录已删）。

## 结论

安全面与 webhook 通道契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
