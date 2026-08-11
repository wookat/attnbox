# GAP-ROUND-753：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook 通道（round-742 后首次；负例多面 + 存量零误 POST）

## 证据（@4,392 会话，迄今最大）

- 无 token 拒绝绑定 0.0.0.0（诚实报错并指引 ATTNBOX_TOKEN）。
- token 门禁十面全对：items/SSE/ack 正负例（无 token/坏 token 401，query token 与 Bearer 200）、坏 ack body（数字时间戳）400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原。
- webhook：启动时对存量 16 waiting 零误 POST；~8 分钟 7 POST 7 唯一零重复无风暴（payload {event,item} 读 item.id 去重）。
- daemon 日志 0 错误；探针零残留（daemon/sink 停止验证、台账逐字节还原、临时文件已删）。
- 方法注记：un-ack 后台账写盘为异步，探针须等 ≥1.5s 再字节比对（500ms 会读到写盘前旧文件，首跑 1 处假 FAIL 已排除，非产品缺陷）。

## 结论

安全面与 webhook 契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
