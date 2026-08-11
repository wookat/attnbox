# GAP-ROUND-632：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-04
驱动维度：安全面 + webhook 通道复测（round-621 后首次；临时 daemon @ 0.0.0.0:4634 + 本地 hook 收集器 @ :4699，真实数据 4,230+ 会话）

## 实测结果

### token 门禁（九面全对）

- 无 token 绑定 0.0.0.0 → 启动即拒绝并退出（exit 1，端口不监听）。
- `/api/items`：无 token 401 / 坏 Bearer 401 / 好 Bearer 200 / 坏 query 401 / 好 query 200。
- `/api/events`（SSE）：无 token 401 / 好 token 200。
- `/api/ack`：无 token 401；好 token + 旧式 `{acked:false}` 坏 body → 400（输入硬化不回退）。
- 静态页 `/` 不受 token 门禁（200，符合设计：token 经 `/?token=` 一次性下发）。

### waiting webhook

- 启动对 21 存量 waiting 零误 POST（baseline 吞掉存量）。
- ~8 分钟观察：7 POST / 5 唯一 ID，全部 `event: "waiting"`；2 个 ID 为真实离开又重入 waiting 的重转换，按守卫契约重发。
- daemon 日志零错误。

## 清理

两个 daemon/收集器全部杀净（端口复核关闭）、临时脚本与日志删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
