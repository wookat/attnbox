# GAP-ROUND-502：rounds 491–501 合并回归审计——soak/双主题 smoke 全绿，无 P0/P1

日期：2026-08-05
驱动维度：运行时回归审计（round-491 后首次；daemon RSS/错误率 soak + 双主题 smoke，main @ #535 后）

## 探针与证据

### daemon soak（~15 分钟 @3,954–3,956 会话，迄今最大；node PID 直采）

```text
RSS 序列（55s 间隔 ×16）：98,216 → 140,976 → 147,228 → 133,444 → 142,620 → 143,400
→ 139,772 → 142,128 → 135,620 → 138,264 → 141,000 → 136,704 → 152,748 → 142,860
→ 155,332 → 148,500 KB
包络 98.2–155.3MB（历史包络 96–159MB 内平稳，无单调上行）
daemon 日志 → 0 error
```

### 双主题 smoke（真实 dogfood 数据）

```text
dark  → 50 卡，0 console/page errors
light → 50 卡，0 console/page errors
```

- 回归门禁：main 合并后 `pnpm test` → Tests 98 passed (98)。
- 清理：daemon 杀净（连接拒绝复测）、探针脚本/日志删除、CDP 残留 service worker 定向关闭（residual 0）。

## 结论

- rounds 491–501 合并面（全部纯文档轮）无运行时回归。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
