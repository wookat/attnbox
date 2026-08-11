# GAP-ROUND-687：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：安全面 + webhook 通道（round-676 后首次；负例多面 + 存量零误 POST）

## 证据一：token 门禁十面全对（@4,304 会话）

1. 无 token 拒绝绑定 0.0.0.0（清晰错误 + 指引）✓
2. items 无 token → 401 ✓
3. items 坏 Bearer → 401 ✓
4. items 正确 Bearer → 200 ✓
5. items 正确 query token → 200 ✓
6. SSE 无 token → 401 ✓
7. SSE 正确 query token → 200 ✓
8. ack 无 token → 401 ✓
9. ack 坏 body（缺 id 字段）→ 400；未知 ID ack → 400（垃圾拒收）✓
10. 真实 ID ack `{id, at}` → 200 入台账、un-ack `{id, at:null}` → 200 出台账，台账 13 条精确还原 ✓

## 证据二：waiting webhook 通道

- 存量 waiting（17 项）启动零误 POST（notified 集合正确抑制存量）。
- ~9 分钟窗口 3 POST 3 唯一（全部为真实新转换，零重复、无风暴）。
- daemon 日志零错误。

探针零残留（daemon/hook server 已停，临时脚本/日志全删，ack 台账还原）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
