# GAP-ROUND-614：分诊全流程 UX 走查——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：分诊全流程 UX 走查（round-603 后首次；临时 daemon @ :4614，真实数据 4,189 会话——迄今最大，waiting 16）

## 实测结果（Playwright 探针，基线 `localStorage.clear()` + reload）

- 默认态：slim SSE，0 全量 `/api/items` fetch；
- 惰性搜索：输入触发恰好 1 次全量 fetch，"devin" 命中 4,183；
- 负例搜索：`zzzz-no-such-xyz` → 诚实空态文案；
- 键盘链：j 选中 → e ack（台账 +1）→ e 再按 toggle 反 ack（台账 -1），符合 round-603 toggle 契约；
- ✓ all done：点击后 waiting 全清（"Needs you" 分区消失），台账 18 项（期间真实新增 2 waiting，按钮 auto-wait 捕获）；
- API 反 ack：`POST /api/ack {id, at:null}` × 18 → 台账归零，SSE 同步回 UI（跨设备同步面顺带复验）；
- ? 帮助面板正常弹出；
- 全程 0 页面错误 / 0 console error。

## 方法注记（新增）

- 探针断言 ack 状态须读 `localStorage["attnbox:acked"]`（daemon `acked` 台账经 SSE 同步至此），不能看 items 上的字段（items 无 ackedAt）；反 ack 契约为 `{id, at: null}`，`{id, acked:false}` 会被 400 拒绝（round-27 输入硬化按设计生效）。
- ack 台账为 daemon 侧持久化：同轮多探针间会互见残留，后续探针须先 API 反 ack 清场再断言 precondition。

## 清理

台账归零、daemon 杀净（端口 000）、探针与日志删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
