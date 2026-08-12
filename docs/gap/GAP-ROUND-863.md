# GAP-ROUND-863 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 863. 主驱动：--host token 门禁负例多面 + waiting webhook 通道复测
（round-852 后首次），@4,513 会话（迄今最大）。

## 契约核验（全通）

- 无 token 拒绝绑定 0.0.0.0（含引导文案）。
- token 门禁八面全对（非 loopback 绑定下 items/SSE/ack 无 token 401、
  坏 token 401、query+Bearer 200、坏 body 400、数字 at 400）。
- 真实 ID ack/un-ack 往返：台账 13→14→13 逐字节还原。
- webhook 冷启动对存量 16 waiting 零误 POST；~9.5 分钟窗口 11 POST
  11 个不同会话 ID，均为真实新转换（lastActivityAt 落在窗口内），
  无重放风暴。

## 方法注记

- 首跑 4 处假 FAIL 为探针假设错误：token 门禁按设计只在非 loopback
  绑定时启用（CLI 仅在 `!loopback && token` 时把 token 传给 daemon），
  绑 127.0.0.1 时 /api/* 不设门禁。改绑 0.0.0.0 后八面全通，非产品缺陷。
- 探针 unique 计数曾误取 `body.id`（实为 `body.item.id`），以日志逐条
  核对 11 个 ID 全不同为准。

## Verdict

无 P0/P1，探针零残留（单 daemon 在跑、API 正常 @4,513）。纯文档轮，
无 changeset。
