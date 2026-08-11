# GAP-ROUND-742：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：--host token 门禁 + waiting webhook 通道复测（round-731 后首次；负例多面 + 零重复）

## 证据（@4,356+ 会话）

- 无 token 拒绝绑定 0.0.0.0（诚实报错并指引 ATTNBOX_TOKEN）。
- token 门禁十面全对：items/SSE/ack 无 token 与坏 token 全 401；Bearer 与 ?token= 正例全 200；坏 ack body（数字时间戳）400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原（cmp 通过）。
- webhook ~9 分钟 7 POST 7 唯一零重复（payload {event,item} 读 item.id），无风暴。
- daemon 日志 0 错误；探针零残留（daemon/sink 停止验证、临时文件已删）。

## 结论

安全面与 webhook 通道契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
