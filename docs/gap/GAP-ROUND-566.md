# GAP-ROUND-566：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-555 后首次；临时 daemon @ :4566，真实数据 ~4,036 会话）

## 证据

### --host token 门禁（八面全对）

```text
无 token 绑定 0.0.0.0：启动即拒绝并给出可读指引 ✓
loopback（127.0.0.1）：不强制 token，八面全部 200（本机自用契约）✓
非 loopback（0.0.0.0 @ 172.16.3.2）带 token：
  无凭证 / 坏 bearer / 空 bearer / 坏 query token / SSE 无凭证 / ack 无凭证 → 全部 401 ✓
  正确 bearer / 正确 query token → 200 ✓
```

### waiting webhook（storm 防护契约）

```text
启动时存量 15 个 waiting：零误 POST ✓
~7.5 分钟观察：4 POST / 3 唯一
  1 个 ID 间隔 ~4.5 分钟重发——期间该会话离开 waiting 后真实重转换，
  符合"离开 waiting 才移出 notified"的守卫契约 ✓
payload 契约 {"event":"waiting","item":{...}} 成立，detail/url/attention 齐备 ✓
daemon 日志错误：0
```

- 清理：daemon 与 hook 接收器杀净（连接拒绝复测）、临时文件删除，零残留。

## 结论

- 安全面与 webhook 通道契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
