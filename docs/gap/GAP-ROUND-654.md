# GAP-ROUND-654：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-11
驱动维度：安全面 + webhook 通道（round-643 后首次；负例多面 + 存量零误 POST）

## 实测（真实构建产物 daemon @4654，@4,277 会话规模）

token 门禁十面全对：

1. 无 token 启动 `--host 0.0.0.0` → 拒绝绑定并给出可读指引（不启动）。
2. `/api/items` 无 token → 401；坏 Bearer → 401；好 Bearer → 200；好 query token → 200。
3. `/api/events?slim=1` 无 token → 401；带 token → 200。
4. `/api/ack` 无 token → 401；坏 body（legacy `{acked:false}`）→ 400；好 body（`{id, at:null}`）→ 200。
5. 首页静态 HTML 无 token → 200（门禁只护 /api/*，与既有契约一致）。

webhook 通道：

- 启动后对存量 waiting 零误 POST（首条 POST 出现在启动 ~3 分钟后，为真实转换）。
- ~8 分钟窗口 7 POST 6 唯一；1 个重复 ID 间隔 298s，为真实 waiting→working→waiting 重转换按守卫契约重发，非风暴。
- payload 契约 `{event, item}` 成立（`body.item.id` 全部可解析）。
- daemon 日志 0 error/exception。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。探针 daemon/hook/日志已清理。
