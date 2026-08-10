# GAP-ROUND-610：--host token 门禁 + waiting webhook 通道复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 复测（round-599 后首次；临时 daemon @ :4610 绑 0.0.0.0 + 本地 sink @ :4611，真实数据 ~4,170 会话）

## 实测结果

### token 门禁九面全对

1. 无 token 拒绝绑定 0.0.0.0（明确安全提示 + 指引）；
2. 无凭证 `/api/items` → 401；
3. 错误 Bearer → 401；
4. 正确 Bearer → 200；
5. 错误 query token → 401；
6. 正确 query token → 200；
7. slim SSE 无 token → 401；
8. slim SSE 带 token → 200；
9. token 设置时 loopback 同样强制（localhost 无凭证 → 401）；静态资源不受 `/api/*` gate（`/` → 200，契约内）。

### webhook 通道

- 对 20+ 存量 waiting 启动零误 POST（初始 POST 全部为启动后真实新转换，非存量重放）；
- ~8 分钟观察 12 POST / 10 唯一，2 个 ID 各重发一次为 vendor 真实抖动按守卫契约重发（非风暴）；
- payload 契约成立：`{event:"waiting", item:{id,status:"waiting",…}}`；
- daemon 日志 error 计数 0。

## 清理

daemon 与 sink 杀净（双端口 000）、临时目录删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
