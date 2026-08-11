# GAP-ROUND-665：--host token 门禁 + waiting webhook 复测——契约全部成立（12/12）

日期：2026-08-04
驱动维度：--host token 门禁负例多面 + waiting webhook 通道（round-654 后首次）

## 证据（@4,279+ 会话）

token 门禁十面全对：

- 无 ATTNBOX_TOKEN 拒绝绑定 0.0.0.0（stderr 明示风险与设置方法）。
- /api/items：无 token 401、坏 Bearer 401、好 Bearer 200、好 query token 200。
- /api/events（SSE slim）：无 token 401、好 token 200。
- /api/ack：无 token 401、坏 body（legacy `acked:false`）400、好 body（`{id, at:null}`）200。

webhook 通道：

- 对存量 waiting 项启动零误 POST（风暴防护契约成立）。
- ~5 分钟观察 11 POST / 8 唯一，全部为 `{event:"waiting", item:{id,…}}` 结构；3 次重复 id 与守卫契约的真实重转换重发路径一致（离开 waiting 后再次转入才重发），无启动风暴。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
- daemon、webhook 接收器、临时探针零残留。
