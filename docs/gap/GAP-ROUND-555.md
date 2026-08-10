# GAP-ROUND-555：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-544 后首次；--host 0.0.0.0 + ATTNBOX_TOKEN + ATTNBOX_WEBHOOK_URL，临时 daemon @ :4555，本机接收器 @ :4666）

## 证据

```text
门禁八面：
  no-token /api/items → 401 ✓   wrong-token → 401 ✓   Bearer 正确 → 200 ✓
  no-token /api/events?slim=1 → 401 ✓
  no-token POST /api/ack → 401 ✓   wrong-token POST → 401 ✓
  ?token= 查询参数正确 → 200 ✓   静态页无 token → 200（设计如此，API 才受门禁）✓
webhook（观察窗 ~7.5 分钟，存量 waiting 11）：
  启动窗对存量零误 POST ✓（首条 POST 出现在启动后 ~7 分钟，均为真实新转换）
  共 6 POST / 5 唯一 ID；1 个 ID 间隔 27s 重发，符合守卫契约
  （仅当观察到 ID 离开 waiting 后重发，vendor 真实抖动忠实透传）
  payload 契约 {event:"waiting", item:{id,status:"waiting"}} 全部成立 ✓
daemon 日志错误：0
```

- 清理：daemon/接收器杀净（端口连接拒绝复测）、探针/日志删除，零残留。

## 结论

- 安全门禁与 webhook 通道契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
