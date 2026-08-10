# GAP-ROUND-504：分诊全流程 UX 走查——契约全部成立，无 P0/P1

日期：2026-08-05
驱动维度：分诊全流程 UX（round-493 后首次；搜索→过滤→ack all→反 ack + 键盘链，临时 daemon @ :4485，真实 dogfood 数据 3,957 会话——迄今最大）

## 探针与证据（localStorage.clear() 后干净基线）

```text
默认态                → 0 次 /api/items 全量 fetch（slim SSE 契约成立）
惰性搜索（用户式单次输入 "session"）→ 恰好 1 次 /api/items fetch，3 命中
  （独立核证：3,957 项中 title/detail 含 "session" 恰好 3 项——1 waiting 2 done，命中数忠实）
负例搜索（zzqqxx-no-match）→ 诚实空态，0 卡
j/e ack 往返（先点 header 取焦）→ 0 → 1 → 0（e 二次 un-ack 契约成立）
✓ all done            → 9 项全 ack；API 反 ack（at:null）→ 归零
? 帮助面板            → 正常显示 Keyboard shortcuts
```

- round-482/493 方法注记（header 取焦、✓ 前缀按钮、inline 帮助面板、搜索单次输入）复核成立。
- 清理：daemon 杀净（连接拒绝复测）、探针脚本/日志删除、CDP 残留 service worker 定向关闭（residual 0）。

## 结论

- 分诊全流程契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
