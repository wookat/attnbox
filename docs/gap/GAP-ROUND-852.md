# GAP-ROUND-852 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 852. 主驱动：--host token 门禁负例多面 + waiting webhook 通道
复测（round-841 后首次，现规模 4,500+ 会话）。

## 门禁核验（9/9 全对）

- 无 token 拒绝绑定 0.0.0.0（启动即报错要求 ATTNBOX_TOKEN）。
- items / SSE / ack 无 token → 401；坏 token → 401。
- query token 与 Bearer → 200。
- ack 坏 body → 400；数字 id → 400。

## ack/un-ack 往返（真实 ID）

- 契约载荷为 `{ id: string, at: string | null }`：ack（at=时间戳）
  台账 13→14，un-ack（at=null）后 13 条且与基线逐字节还原。

## webhook 通道

- 冷启动对存量 11 waiting 零误 POST。
- ~8 分钟观察 4 POST 4 唯一，均为真实新转换，无风暴无重放。

## 方法注记

- /api/ack 契约为 `{id, at}` 而非 `{id, acked}`——探针首跑按旧假设
  发 `acked: true` 得 `{"ok":false,"error":"expected { id: string,
  at: string | null }"}`，为探针假设错误，非产品缺陷；修正后往返
  全对。
- 探针收尾 `pkill -f 'port 4877'` 匹配到自身命令行自杀（SIGTERM），
  为探针工具问题；测试 daemon 已正常退出，非产品缺陷。

## Verdict

无 P0/P1：门禁与 webhook 契约全部成立。探针零残留。纯文档轮，
无 changeset。
