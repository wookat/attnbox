# GAP-ROUND-896 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 896. 主驱动：--host token 门禁 + waiting webhook 通道复测——round-885 后首次。证据窗口：2026-08-04，live @4,556 会话（迄今最大）。

## token 门禁（隔离端口，10/10 首跑全通）

- 无 token 拒绝绑定 0.0.0.0（错误信息明确提及 token）。
- 有 token 非 loopback 绑定：items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 at 400。
- 隔离 daemon 冷启动就绪采用轮询判据（round-885 方法注记）。

## ack/un-ack 往返（主 daemon @4820）

真实 waiting ID ack → 台账 13→14，un-ack（`{"id","at":null}`）→ 轮询至逐字节还原 ✓。

## webhook 通道（隔离 daemon + 本地接收器）

- 冷启动对存量 14 waiting 零误 POST（30s 窗口 0 条）。
- ~6 分钟观察 18 POST 12 唯一会话 ID：多次者均为真实重转换重发（round-874 同契约），无风暴。
- 载荷符合 `{"event", "item"}` 契约。

探针零残留（隔离 daemon/接收器均已关停，主台账逐字节还原）。

## Verdict

无 P0/P1。纯文档轮，无 changeset。
