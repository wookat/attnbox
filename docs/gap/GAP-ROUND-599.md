# GAP-ROUND-599：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-588 后首次；临时 daemon @ :4599 绑定 0.0.0.0，真实数据 ~4,137 会话）

## token 门禁（九面全对）

1. 无 token 拒绝绑定 0.0.0.0（清晰的整改指引文案）。
2. 无凭证 `/api/items` → 401。
3. 错误 Bearer → 401。
4. 正确 Bearer → 200。
5. 错误 query token → 401。
6. 正确 query token → 200。
7. SSE 无凭证 → 401。
8. SSE 带 token → 正常出流。
9. loopback 在 token 设置时同样强制（127.0.0.1 无凭证 → 401）；静态资源不受 `/api/*` 门禁限制（设计内）。

## webhook 通道

- 启动对存量 waiting（20+）零误 POST。
- ~8 分钟窗口 11 POST / 7 唯一 ID，全部为真实新 waiting 转换；4 个 ID 重发为 vendor 真实抖动（离开又回到 waiting）按守卫契约重发，非风暴。
- payload 契约成立：`{event:"waiting", item:{id,status:"waiting",…}}`。
- daemon 日志 error 计数 0。

## 清理

daemon 与 webhook 接收器杀净（双端口 000）、临时文件删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
