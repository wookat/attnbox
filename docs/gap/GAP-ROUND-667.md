# GAP-ROUND-667 — rounds 656–666 合并回归审计（无 P0/P1）

日期：2026-08-04。主驱动：运行时回归审计（round-656 后首次），覆盖 rounds 656–666 合并面（含 round-663 grayscale P1 修复后的稳定窗口、660 MATURITY、661 数据面、662 CLI、664 PWA、665 门禁、666 handoff）。

## 方法

- daemon soak：`node packages/cli/dist/index.js --port 4667`（setsid nohup 起，`pgrep -f "dist/[i]ndex.js --port 4667"` 核实 PID 存活），每 30s 采样 RSS，共 30 样本（~15 分钟）。
- 双主题 smoke：Playwright dark/light 各一独立 context，`domcontentloaded` + 卡片选择器 `li[id^=item-]`，收集 pageerror/console error。
- 单元回归：`pnpm test`。

## 结果

| 检查 | 结果 |
| --- | --- |
| daemon soak（~15 分钟 @4,287 会话，迄今最大） | RSS 106–159MB，包络内平稳，无增长趋势 |
| daemon 日志错误 | 0（error/exception 计 0） |
| 双主题 smoke | dark 58 卡 / light 58 卡，pageErrors=0，console errors=0 |
| 单元测试 | 98 passed (98) |

## 结论

rounds 656–666 合并面全绿，无 P0/P1。RSS 包络与 rounds 645/656 一致（此前 107–161MB），无回归。探针零残留（daemon 已停、日志/临时脚本已清理）。
