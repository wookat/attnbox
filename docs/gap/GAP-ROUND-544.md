# GAP-ROUND-544：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-533 后首次；临时 daemon @ :4544 --host 0.0.0.0，真实数据 ~4,009 会话——迄今最大）

## 证据

```text
token 门禁七面：
  无 token：/api/items、/api/events?slim=1、POST /api/ack → 401 ✓（三面）
  坏 bearer → 401 ✓；坏 query token → 401 ✓
  好 bearer → 200 ✓；好 query token → 200 ✓
webhook（sink @ :4599）：
  启动窗存量 20 waiting 仅 1 POST（该项 lastActivityAt 为启动后 ~13 秒的真实新转换，非存量误发）
  ~6.5 分钟 6 POST 6 唯一：全部为真实新转换，零重复
daemon/sink 日志错误：0
```

- round-500/511/533 webhook 守卫契约复核成立（本轮无 vendor 抖动，全部一次性送达）。
- 清理：daemon/sink 杀净（连接拒绝复测）、日志/数据快照删除，零残留。

## 结论

- --host token 门禁 + webhook 通道契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
