# GAP-ROUND-885 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 885. 主驱动：安全面负例多面 + webhook 通道——round-874 后首次，
现规模 4,550 会话（迄今最大）。

## 证据

### token 门禁（11/11）

- 无 token 拒绝绑定 0.0.0.0（明确 token 提示）。
- 非 loopback 绑定下：items / SSE / ack 无 token 均 401、坏 token 401、
  `?token=` 200、`Authorization: Bearer` 200、坏 body 400、数字 `at`
  400。
- 真实 ID ack/un-ack 往返：台账 13→14→13 逐字节还原。

### webhook 通道

- 冷启动对存量 23 waiting 零误 POST。
- ~8 分钟观察 8 POST 7 个不同会话 ID（1 会话 2 次为真实重转换重发，
  无风暴），均为真实新转换。

## 方法注记

- 隔离 daemon 冷启动全量爬取需 ~10s 才绑定端口——探针须轮询就绪而非
  固定 sleep（首跑 8 处假 FAIL 为探针就绪假设，非产品缺陷）。
- webhook payload 的 ID 在 `item.id`（顶层无 `id` 字段）。

## Verdict

无 P0/P1。台账逐字节还原、隔离 daemon 已停、探针零残留。纯文档轮，
无 changeset。
