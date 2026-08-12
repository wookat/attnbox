# GAP-ROUND-874 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 874. 主驱动：安全面负例多面 + webhook 存量零误 POST
（round-863 后首次），@4,527+ 会话。

## 证据（11/11 首跑全通）

- 无 token 拒绝绑定 0.0.0.0（诚实警示文案）。
- 非 loopback 绑定 token 门禁八面全对：items/SSE/ack 无 token 401、
  坏 token 401、query token 200、Bearer 200、坏 body 400、
  数字 at 400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原
  （轮询 byte-identical）。
- webhook 冷启动对存量 21 waiting 零误 POST；~8 分钟 10 POST
  8 唯一会话 ID（1 会话 3 次为真实重转换重发，无风暴）。
- 隔离端口 4897–4899 沙箱，探针零残留，主 daemon 未受影响。

## Verdict

无 P0/P1。纯文档轮，无 changeset。
