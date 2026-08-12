# GAP-ROUND-830：--host token 门禁 + waiting webhook 复测（round-819 后首次）

日期：2026-08-04。主驱动：安全面负例多面 + webhook 存量零误 POST。纯文档轮，无 P0/P1。

## 实测证据（生产 daemon @4,468+ 会话，迄今最大）

### token 门禁（隔离 4890 实例，九面全对）

- 无 token 绑定 0.0.0.0 → 拒绝启动并给出 ATTNBOX_TOKEN 指引。
- items/SSE/ack 无 token 均 401；query token 与 Bearer 均 200；坏 token 401。
- 坏 ack body 400；数字 Unix 毫秒时间戳 400（ISO 字符串契约保持）。

### ack/un-ack 往返（生产 4820）

- 真实 waiting ID ack 200，台账 13→14；un-ack 200 后与基线逐字节还原（cmp 通过）。

### waiting webhook（隔离 4891 实例 + 本地接收器）

- 冷启动对存量 15 waiting 零误 POST（无风暴/无重放）。
- ~8.5 分钟 soak 7 POST 6 唯一：1 处重复为同一会话真实重转换重发（waiting→非 waiting→waiting），非风暴。
- 载荷带 item.id/detail/url，均为真实新转换。

探针零残留（隔离实例与接收器已回收，台账逐字节还原）。

## P0/P1 判定

无。

## 门禁

本地 `pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
