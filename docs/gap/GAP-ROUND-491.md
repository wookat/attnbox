# GAP-ROUND-491：rounds 480–490 合并面运行时回归审计——纯文档，无 P0/P1

日期：2026-08-05
驱动维度：运行时回归审计（round-480 后首次；daemon soak RSS/错误率 + 双主题 smoke + 单测门禁）

## 探针与证据

- main @ `5c5e9fb`（#524 合并后），`pnpm test` → Tests 98 passed (98)。
- daemon soak：`node packages/cli/dist/index.js --port 4477`，真实 dogfood 数据 @3,945→3,947 会话（迄今最大），~16 分钟每分钟采样 node PID RSS：

```text
138,748–154,132 KB（≈136–151MB），包络内平稳无单调增长
daemon 日志：仅启动行 1 行，0 error
```

- 双主题 smoke（CDP + Playwright，emulateMedia dark/light 各开新页）：

```text
dark  → 51 卡 0 console/page 错误
light → 51 卡 0 console/page 错误
```

- 方法注记：3.9k 规模下 SSE 常连使 `waitUntil: "networkidle"` 永不满足——smoke 导航须用 `domcontentloaded` + 定长等待。
- 清理：soak daemon 已 fuser -k 4477/tcp 杀净（复测连接拒绝）、临时脚本/日志已删、零残留。

## 结论

- rounds 480–490 合并面（全部纯文档轮）无运行时回归：RSS 包络与 round-480（136–159MB @3,935）一致、零错误、双主题 0 错误、98 测试全绿。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
