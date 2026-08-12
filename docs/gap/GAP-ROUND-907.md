# GAP-ROUND-907 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 907. 主驱动：安全面负例多面 + webhook 存量零误 POST（round-896 后首次）。证据日期：2026-08-04。

## token 门禁（10/10 首跑全通，隔离端口）

- 无 token 拒绝绑定 0.0.0.0（报错提及 token）。
- 非 loopback 绑定 + token：items/SSE/ack 无 token 401、坏 token 401、query token 200、`Authorization: Bearer` 200、坏 body 400、numeric-`at` 400。

## ack/un-ack + webhook（5/5 首跑全通 @4,569 会话，迄今最大）

- 真实 ID ack/un-ack 往返：台账 13→14→13 逐字节还原。
- webhook 冷启动对存量 14 waiting 零误 POST。
- ~6 分钟观察窗：6 POST 6 唯一会话 ID，均为真实新转换，零重放无风暴。

探针零残留（隔离 daemon 全部退出）。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
