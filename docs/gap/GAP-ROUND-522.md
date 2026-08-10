# GAP-ROUND-522：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-511 后首次；真实数据 ~3,973 会话）

## 证据

### --host token 门禁（七面全对）

```text
无 token 启动 --host 0.0.0.0 → 拒绝绑定（诚实警告 + 指引）
ATTNBOX_TOKEN 设置后：
  /api/items 无 token → 401
  错误 Bearer → 401
  正确 Bearer → 200
  ?token=正确 → 200
  ?token=错误 → 401
  /api/events?slim=1 无 token → 401
  POST /api/ack 无 token → 401
```

### waiting webhook（本地 sink @ :4599，~7.5 分钟观察）

```text
启动时存量 15 waiting → 零误 POST（waitingSeen 初始化契约成立）
窗内 6 POST 6 唯一 ID，全部为真实新转换（首条核证 lastActivityAt 晚于 daemon 启动）
waiting 期内零重复 POST；daemon 日志错误 0
```

- 清理：两只 daemon + sink 杀净（连接拒绝复测）、日志删除，零残留。

## 结论

- 门禁与 webhook 守卫契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
