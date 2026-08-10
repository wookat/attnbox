# GAP-ROUND-515：分诊全流程 UX 走查——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：UX 走查（round-504 后首次；临时 daemon @ :4515，真实数据 3,967 会话——迄今最大）

## 证据

```text
默认态（localStorage.clear + reload 后 9s 窗）：38 卡，/api/items fetch 0 次（slim SSE 契约成立）
惰性搜索 "devin"（用户式单次输入）：恰好 1 次 /api/items，3,961 命中
负例搜索：诚实空态（"Nothing here / No sessions match this search."）
键盘链（header 取焦后）：j 选中 → e ack（台账 1 项）→ e un-ack（台账归零）
✓ all done：7 项 waiting 全部入 ack 台账
API 反 ack（{id, at:null} 循环）：台账归零
? 帮助面板：正常显示
```

- 方法注记复核成立（rounds 438/446/482）：惰性 fetch 断言用 pressSequentially 单次输入；键盘断言前点击 header 取焦；ack-all 按钮文案带 ✓ 前缀。
- 清理：daemon 杀净（连接拒绝复测）、探针脚本/日志删除、sw.js service-worker target 定点关闭，残留 0。

## 结论

- 分诊全流程（搜索→过滤→ack all→反 ack + 键盘链）契约全部成立 @3,967 会话（迄今最大）。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
