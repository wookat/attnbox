# GAP-ROUND-493：分诊全流程 UX 走查——契约全部成立，无 P0/P1

日期：2026-08-05
驱动维度：分诊全流程 UX 走查（round-482 后首次；搜索→过滤→ack all→反 ack + 键盘链）

## 探针与证据（临时 daemon @ :4478，真实 dogfood 数据 3,947 会话——迄今最大；CDP + Playwright，基线前 localStorage.clear()+reload）

```text
默认态 /api/items 全量 fetch          → 0（slim SSE 契约成立）
惰性搜索（用户式单次输入）             → 恰好 1 次 /api/items fetch
负例搜索 zzzz-no-such-item-xyz        → 诚实空态文案
j 选中 + e ack → 台账 0→1             → e 二次 un-ack → 归 0
? 帮助面板（inline "Keyboard shortcuts"）→ 正常显示，Esc 关闭
✓ all done                            → 5 项 waiting 全 ack（台账 5）
API 反 ack（POST /api/ack at:null）    → 台账归 0
```

- 方法注记复核成立（round-482 三条）：键盘断言前点击 header 取焦、ack-all 按钮文案带 ✓ 前缀、? 面板为 inline panel 非 dialog role。
- 清理：daemon fuser -k 杀净、探针脚本删除、CDP 残留 sw.js target 定向关闭（residual 0）。

## 结论

- 分诊全流程契约全部成立，无回归。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
