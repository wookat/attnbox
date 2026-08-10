# GAP-ROUND-559：分诊全流程 UX 走查——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：分诊全流程 UX 走查（round-548 后首次；临时 daemon @ :4559，真实数据 ~4,023 会话——迄今最大）

## 证据（Playwright 用户式探针，localStorage 清理后基线）

```text
1) 默认态 45 卡，基线后 0 次全量 /api/items fetch（slim SSE 契约成立）
2) 惰性搜索 "devin"（pressSequentially 用户式输入）：恰好 1 次 fetch、4,023 命中
   —— 首跑记 2 次为探针基线窗口误差（reload 后 8s 稳定期不足），
      复跑独立核证恰好 1 次（83ms 处单次 /api/items）
3) 负例搜索诚实空态：0 卡 + "no sessions match" 文案
4) 键盘 j/e ack 往返：e → acked 1，再 e → 反 ack 归零 ✓
5) Needs you 6 卡，✓ all done → acked 6 ✓
6) API 反 ack（POST /api/ack {id, at:null}）全部归零 ✓
7) ? 快捷键帮助面板正常 ✓
```

- 清理：daemon 杀净（连接拒绝复测）、探针/日志删除，零残留。

## 方法注记

- 惰性搜索计数探针须在 reload 后留足稳定窗（≥8s）再清零计数，否则残余首屏请求会被误记入搜索次数（本轮首跑假象，复跑排除）。

## 结论

- 分诊全流程契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
