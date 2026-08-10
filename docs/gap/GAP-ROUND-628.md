# GAP-ROUND-628：dogfood 数据健康度复查——4,231 会话全干净，无 P0/P1

日期：2026-08-04
驱动维度：dogfood 数据健康度（round-617 后首次；临时 daemon @ :4631，真实数据全量 `/api/items` 审计）

## 实测结果

- 规模：4,231 会话（迄今最大）。状态分布：waiting 21 / working 62 / idle 6 / done 4,142。
- 0 未知状态、0 重复 ID、0 不可解析时间戳、feed 内 0 残留 acked 项。
- waiting 21/21 全带 detail + url + attention——"在等什么/去哪回答"全覆盖。
- waiting 时长分布：min 1.8 分钟 / 中位 13.6 分钟 / max 2,817.6 分钟——max 为真实长挂 Devin 会话（基线落地批次① PR 讨论挂起），忠实透传非数据缺陷。
- 连续第四十四个干净数据轮。

## 清理

daemon 杀净（fuser -k 4631/tcp，端口复核关闭）、日志与数据快照删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
