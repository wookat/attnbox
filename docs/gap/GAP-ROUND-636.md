# GAP-ROUND-636：分诊全流程 UX 走查——契约全部成立

日期：2026-08-05
驱动维度：分诊全流程 UX 走查（round-625 后首次；搜索→过滤→ack all→反 ack + 键盘链）

## 证据（Playwright @ `--port 4636`，~4,246+ 会话，迄今最大规模级别）

- 默认态：72 卡渲染，`/api/items` 全量 fetch 0 次（slim SSE 契约成立）。
- 惰性搜索：首次输入触发恰好 1 次全量 fetch；"devin" 命中 4,246；负例 `zzzznotfoundzzzz` 诚实空态（0 卡 + 空态文案）。
- 键盘链：`j` 选中后 `e` ack 往返（台账 0→1→0，e 为 toggle；断言读 `attnbox:acked`，daemon 侧持久化已清场）。
- ✓ all done：一键 ack 20 项；随后 API 反 ack（`{id, at: null}`）经 SSE 同步台账归零。
- `?` 帮助面板正常弹出。
- 0 pageerror；daemon 日志 0 错误；探针零残留（临时脚本/日志已删、daemon 已杀、ack 台账已清）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
