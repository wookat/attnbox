# GAP-ROUND-511：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-500 后首次；临时 daemon @ :4489/:4490，真实数据 3,96x 会话）

## 证据

### --host token 门禁（七面）

```text
items 无 token        → 401
items 坏 bearer       → 401
items ?token=错       → 401
ack POST 无 token     → 401
events 无 token       → 401
items 有效 bearer     → 200
events?slim=1&token=✓ → 200 text/event-stream
启动横幅诚实提示 non-loopback bind 需 ATTNBOX_TOKEN ✓
```

### waiting webhook（本地 sink @ :9099）

```text
启动窗（首爬 ~55s）   → 对 10 条存量 waiting 零误 POST（首轮只记账不通知契约成立）
~6.5 分钟观察窗       → 3 POST 2 唯一 ID
  1 个 ID 间隔 21s 重发——与 rounds 500/501 入档的守卫签名一致：
  vendor 状态在 3s 轮询周期内真实离开 waiting 后再转换，守卫契约成立（观察到离开才删记账）
payload 形状 {event:"waiting", item:{id,status}} ✓
daemon 日志零错误
```

- 清理：两个 daemon 与 sink 杀净（连接拒绝复测）、日志删除，零残留。

## 结论

- 门禁七面全对 + webhook 存量零误 POST、守卫契约成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
