# GAP-ROUND-929 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 929. 主驱动：--host token 门禁负例多面 + webhook 存量零重放——round-918 后首次。证据日期：2026-08-04，@4,608 会话（迄今最大）。

## 复测结果

### token 门禁（10/10 首跑全通）
- 无 token 拒绝绑定 0.0.0.0（报错提及 token）。
- 隔离 daemon 带 token 就绪（轮询就绪法）。
- items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 at 400。

### ack/un-ack 往返
- 真实 ID ack 台账 13→14，un-ack 后逐字节还原。

### webhook 通道
- 冷启动 id 集合比对：对存量 15 waiting 零重放（posts=0, replayed=0）。
- ~6 分钟观察：2 POST 2 唯一，均为真实新转换，无风暴。
- 方法注记：计数法探针首跑 1 处假 FAIL（就绪窗口内真实新转换被计入 posts=1），round-918 已入档"零重放断言须比对存量 waiting id 集合而非 POST 计数"，id 集合法复测确证零重放，非产品缺陷。

探针零残留（隔离端口 daemon 已退出）。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
