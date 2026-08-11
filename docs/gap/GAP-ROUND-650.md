# GAP-ROUND-650：dogfood 数据健康度复查——4,276 会话全干净

日期：2026-08-11
驱动维度：dogfood 数据健康度（round-639 后首次；waiting/ack 数据健康度 + waiting 时长分布）

## 实测（真实构建产物 daemon @port 4650，/api/items 全量快照）

- 总量 4,276 会话（迄今最大）：waiting 8 / working 49 / idle 6 / done 4,213。
- 0 未知状态、0 重复 ID、0 坏时间戳（lastActivityAt 全部可解析且无未来时间）。
- waiting 8/8 全带 detail + url + attention（全部 devin/answer，authoritative）。
- waiting 时长分布：中位 19.9 分钟、min 7.3、max 3,043.9 分钟——max 为真实长挂 blocked 会话（基线落地批次①，最后活动 08-09），忠实透传非数据缺陷。
- ack 台账（~/.attnbox/acked.json）为空对象，零孤儿 ack。
- daemon 日志 0 error/exception。

## 结论

- 无 P0/P1。连续第四十六个干净数据轮。纯文档轮：不改产品源码、不加 changeset。
