# GAP-ROUND-709：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook 通道（round-698 后首次）

## 证据（@4,327+ 会话）

token 门禁（ATTNBOX_TOKEN + --host 0.0.0.0）：

| 面 | 结果 |
|---|---|
| 无 token 绑定 0.0.0.0 | 拒绝并给出可读指引 ✓ |
| /api/items 无 token / 坏 token | 401 / 401 ✓ |
| /api/items query token / Bearer | 200 / 200 ✓ |
| /api/events 无 token / 带 token | 401 / 200 ✓ |
| /api/ack 无 token | 401 ✓ |
| /api/ack 坏 body（带 token） | 400 ✓ |
| 真实 ID ack/un-ack 往返 | 台账 13→14→13 逐字节精确还原 ✓ |

webhook（ATTNBOX_WEBHOOK_URL）：

- 启动对存量 waiting 零误 POST（首采集不重放存量）。
- ~8 分钟观察 5 POST 5 唯一 ID，零重复——均为真实新转换。
- daemon 日志零错误。

探针零残留（daemon/hook 进程已停，临时文件与台账备份已删，台账核实一致）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
