# GAP-ROUND-731：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：--host token 门禁 + waiting webhook 通道复测（round-720 后首次；负例多面 + 存量零误 POST）

## 证据（@4,351 会话）

token 门禁十面全对：

1. 无 ATTNBOX_TOKEN 时拒绝绑定 0.0.0.0（诚实报错并给设置指引）；
2. /api/items 无 token → 401；
3. /api/items 坏 token → 401；
4. /api/events?slim=1 无 token → 401；
5. /api/items?token=正确 → 200；
6. Bearer 头 → 200；
7. SSE + token → 200；
8. /api/ack 无 token → 401；
9. /api/ack 坏 body（at 为数字）→ 400；
10. 真实 ID ack/un-ack 往返：台账 13→14→13，un-ack 后与基线逐字节一致（cmp 验证）。

webhook 通道：

- 启动对存量 waiting 零误 POST；
- ~8 分钟窗口 1 POST 1 唯一（真实新转换 devin 会话，`{event:"waiting", item:{…}}` 结构正确），零重复零风暴；
- daemon 日志零错误。

方法注记：webhook payload 顶层是 `{event, item}` 而非扁平 item——去重断言须读 `item.id`（首跑 1 处探针 KeyError 已排除，非产品缺陷）。探针零残留（daemon/钩子服务器已停核验）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
