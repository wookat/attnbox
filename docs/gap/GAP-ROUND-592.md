# GAP-ROUND-592：分诊全流程 UX 走查——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：分诊全流程 UX（round-581 后首次；临时 daemon @ :4592，真实数据 4,124 会话——迄今最大）

## 实测结果

1. 默认态：78 卡，settle 后 0 次全量 `/api/items` fetch（slim SSE 契约成立）。
2. 惰性搜索：输入触发恰好 1 次全量 fetch，"devin" 命中 4,122（复跑核实；首跑因探针在 clear+reload 前先行输入多计 1 次，为探针假象已排除）。
3. 负例搜索：0 卡 + 诚实空态文案。
4. Needs you 过滤：18 waiting 卡。
5. j → e ack 往返：ack 台账 +1，卡片按契约收敛。
6. API 反 ack（`{id, at:null}`）：台账归零。
7. ✓ all done：15 项一键 ack，全部入台账；批量 API 反 ack 后台账归零复核 0。
8. ? 帮助面板正常显示。
9. 走查期间 waiting 18→14 为 vendor 真实数据变动（收尾 API 复核 waiting=14、acked=0），非丢失。

## 清理

daemon 杀净（端口 000）、探针脚本/日志删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
