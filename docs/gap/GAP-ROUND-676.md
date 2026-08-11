# GAP-ROUND-676：--host token 门禁 + waiting webhook 复测——契约全部成立

日期：2026-08-04
驱动维度：--host token 门禁 + waiting webhook 通道复测（round-665 后首次；负例多面 + 存量零误 POST，@4,295+ 会话）

## 证据

### token 门禁十面全对

1. 无 token `--host 0.0.0.0`：拒绝绑定并给出可行动指引（exit 前打印设置说明）。
2. `/api/items` 无 token → 401。
3. `/api/items` 坏 Bearer → 401。
4. `/api/items` 正确 Bearer → 200。
5. `/api/items?token=` 正确 query → 200。
6. `/api/events?slim=1` 无 token → 401。
7. `/api/events?slim=1&token=` 正确 query → 200。
8. `/api/ack` 无 token → 401。
9. `/api/ack` 正确 Bearer + 坏 body → 400（垃圾不入台账）。
10. `/api/ack` 正确 Bearer ack/un-ack 往返 → 200/200。

### webhook 通道

- 对存量 waiting（15 项）启动零误 POST——首采集基线不重放。
- ~8 分钟窗口 5 POST 4 唯一：唯一重复项两次 POST 间该会话有真实活动（lastActivityAt 落在两次之间），为守卫契约允许的真实重转换重发；另一项 POST 后已转 working，证实均为真实转换而非陈旧重放。无风暴。
- daemon 日志零错误。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。探针零残留（daemon/接收器已停、临时日志已删）。
