# GAP-ROUND-621：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面（--host token 门禁九面）+ webhook 通道（round-610 后首次；临时 daemon @ :4621，真实数据 4,211 会话——迄今最大）

## 实测结果

### token 门禁九面全对

1. 无 token 绑定 `0.0.0.0`：启动即拒绝，给出 ATTNBOX_TOKEN 指引。
2. token 设置时 loopback 同样强制：`/api/items` 无凭证 → 401。
3. Bearer 正确 → 200；4. Bearer 错误 → 401。
5. query token 正确 → 200；6. query token 错误 → 401。
7. SSE `/api/events` 无 token → 401；8. SSE 带 token → 200。
9. `POST /api/ack` 无 token → 401。

### webhook 通道

- 启动时 28 个存量 waiting：零误 POST（首个采集轮仅记账不发送）。
- ~8 分钟观察窗：10 POST / 8 唯一 ID，全部为窗口内真实新转换；2 个 ID（`ccba…`、`5e56…`）为真实 waiting→非 waiting→waiting 重转换，按守卫契约（`waitingSeen` 集合）合法重发。
- payload 形如 `{event:"waiting", item}`；daemon 日志 0 错误。

## 清理

daemon 与 sink 杀净（端口 000），临时文件删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
