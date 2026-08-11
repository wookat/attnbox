# GAP-ROUND-720：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：--host token 门禁 + waiting webhook 通道（round-709 后首次；负例多面 + 存量零误 POST）

## 证据（@4,345+ 会话）

- 无 token 拒绝绑定 0.0.0.0（明确错误信息 + 引导设置 ATTNBOX_TOKEN）。
- 门禁十面全对：items/SSE/ack 无 token 401、坏 token 401、Bearer 200、query token 200、坏 ack body（数字 id/数字 at）400。
- 真实 ID ack/un-ack 往返：台账 13→14→13，逐字节还原（cmp byte-equal: true）。
- webhook 对存量 waiting 启动零误 POST；~8 分钟 4 POST 1 唯一 ID（重复限于同一会话真实重转换重发，无风暴）。
- daemon 日志零错误；探针零残留（daemon/webhook 接收器已停，临时文件已删）。

## 结论

- 安全面与 webhook 通道契约全部成立，rounds 710–719 合并面无回归。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
