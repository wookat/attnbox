# GAP-ROUND-500：--host token 门禁七面 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-05
驱动维度：安全面 + webhook 通道（round-489 后首次；--host 0.0.0.0 + ATTNBOX_TOKEN 负例多面、webhook 存量零误 POST + 转换实弹）

## 探针与证据

### Token 门禁七面（--host 0.0.0.0，非回环地址访问）

```text
GET /api/items no token        → 401
GET /api/items bad bearer      → 401
GET /api/items?token=nope      → 401
POST /api/ack no token         → 401
GET /api/events no token       → 401
GET /api/items valid bearer    → 200
GET /api/events?slim=1&token=✓ → 200 text/event-stream
```

### Webhook 通道（本地接收器 @ :4483，~6.5 分钟 soak）

```text
启动窗（首爬 8 个存量 waiting）→ 0 误 POST（首过只记账不重发契约成立）
soak 期 → 5 POST / 4 唯一 ID，全为真实新转换（payload 带完整 item：id/status/detail/url/attention）
重复 1 个 ID（间隔 3.8s）→ 守卫契约成立：3s 采集周期内该会话 vendor 状态真实抖动
  （waiting→非 waiting→waiting，waitingSeen 仅在观察到离开 waiting 时移除，复测末仍 waiting）
daemon 日志 → 0 error
```

- 清理：daemon 与接收器杀净（连接拒绝复测）、临时日志删除、零残留。

## 结论

- 门禁七面全对 + webhook 存量零误 POST、守卫契约成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
