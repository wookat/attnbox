# GAP-ROUND-625：分诊全流程 UX 走查——契约全部成立，无 P0/P1

日期：2026-08-04
驱动维度：分诊全流程 UX 走查（round-614 后首次；临时 daemon @ :4630，真实数据 4,230 会话——迄今最大，waiting 26/26 detail+url）

## 实测结果（Playwright 独立上下文，基线 localStorage.clear() + reload）

- 默认态：0 次全量 `/api/items` fetch（slim SSE 契约成立），首屏 92 卡。
- 惰性搜索：输入查询恰好触发 1 次全量 fetch，4,224 命中渲染；负例查询诚实空态（0 卡）。
- j/e ack 往返：`e` ack 后台账 +1，`e` 再按 toggle 回退——契约成立（探针注记复用：断言须读 `attnbox:acked` 台账）。
- ✓ all done：一键 ack 27 项 waiting；随后逐项 `POST /api/ack {id, at: null}` 反 ack，经 SSE 同步台账归零（含前一探针在 daemon 侧持久化的 1 项残留一并清净——round-614 方法注记再验证）。
- ? 帮助面板正常弹出，快捷键列表完整。
- 全程 0 页面错误。

## 清理

daemon 杀净（fuser -k 4630/tcp，端口复核 CLOSED）、ack 台账清零、探针脚本与日志删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
