# GAP-ROUND-513：rounds 502–512 合并回归审计——soak/双主题 smoke 全绿，无 P0/P1

日期：2026-08-10
驱动维度：运行时回归审计（round-502 后首次；临时 daemon @ :4513，真实数据 3,967 会话——迄今最大）

## 证据

### daemon soak（~15 分钟，60s 采样 × 15）

```text
数据规模：3,967 会话（迄今最大）
RSS 包络：141.1–158.0 MB（平稳，无单调增长；与 round-502 包络 98–155MB / round-491 138.7–154.1MB 同量级）
daemon 日志错误数：0
```

- 方法注记复核（round-381）：pgrep 首个 PID 命中 setsid wrapper（RSS ~1.9MB 假读数），须取真 node PID 采样——本轮首个采样序列作废重取，注记继续成立。

### 双主题 smoke

```text
dark  → 37 卡 0 页面错误 0 console 错误
light → 37 卡 0 页面错误 0 console 错误
```

- 卡片选择器注记：卡片元素为 `li` 非 `article`（首跑 0 卡为选择器失配非产品问题，body 文本核实 37 项正常渲染后修正断言）。

### 单元回归

```text
Tests  98 passed (98)
```

- 清理：daemon 杀净（连接拒绝复测）、日志与探针脚本删除，零残留。

## 结论

- rounds 502–512 合并面（全部纯文档轮）无运行时回归。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
