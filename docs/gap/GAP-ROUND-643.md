# GAP-ROUND-643：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-05
驱动维度：--host token 门禁 + waiting webhook 通道（round-632 后首次；负例多面 + 存量零误 POST）

## 证据（@4,264–4,266 会话，迄今最大）

- token 门禁十面全对：无 token 拒绝绑定 0.0.0.0（exit 1 + 明确报错）、静态 `/` 无 token 200（首次 token 交接可用）、/api/items 无 token / 错 token 拒绝、Bearer 与 query token 正例 200、SSE 无 token 拒绝 + query token 200、坏 ack body（legacy `acked:false` 形状）400、合法 ack 形状 200。
- webhook：对 18 存量 waiting 启动零误 POST（初始 seeding 无通知）；~8 分钟 5 POST 5 唯一 ID，全部为真实新进 waiting 转换，零重复。
- daemon 日志错误计数 0；探针零残留（daemon 已杀、临时脚本已删）。
- 方法注记：webhook payload 为 `{ event: "waiting", item }`，探针断言 ID 须取 `body.item.id`（首跑取 `body.id` 得空为探针错误，非产品缺陷）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
