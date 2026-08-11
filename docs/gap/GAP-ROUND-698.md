# GAP-ROUND-698：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面（--host token 门禁负例多面）+ webhook 通道（round-687 后首次）

## 证据（@4,312+ 会话）

token 门禁十面全对：

- 无 ATTNBOX_TOKEN 时拒绝绑定 0.0.0.0（明确警示文案，进程直接退出）。
- items/SSE/ack：无 token 401、坏 token 401、Bearer 与 query token 均 200。
- 坏 ack body（非 JSON）400。
- 真实 ID ack（ISO 时间戳）/un-ack 往返：台账 13 → 14 → 13 精确还原（数字 at 被 400 拒绝为输入硬化契约，ISO 字符串为正确格式）。

webhook：

- 对存量 waiting 启动零误 POST（守卫契约成立）。
- ~8 分钟窗口 12 POST 10 唯一（重复限于真实重转换重发，无风暴），payload 带 event/item 全字段（id/url/prUrl/title）。
- daemon 日志零错误。

探针零残留（daemon/接收器已停、/tmp/r698-* 已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
