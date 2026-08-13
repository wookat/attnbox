# GAP-ROUND-959: CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04。round-948 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 与 API 同刻精确一致、hooks --install 沙箱四态 6/6 首跑全通，无 P0/P1**。

## 1. doctor（~0.15s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式（从不声称 waiting）✓、devin API key 有效 ✓、github-pr 无 token 诚实降级 –、webhook 未配置诚实提示 –。

## 2. ls --waiting（热跑 ~7.5s @4,624 会话，迄今最大）

- 10 waiting 全带"在等什么"预览、等待时长、行动链接（session + PR 次级链接）。
- 尾行计数与 API 同刻精确一致：`10 waiting on you · 39 working · 4624 total` == API summary `{total: 4624, waiting: 10, working: 39}`。

## 3. hooks --install 沙箱四态（6/6 首跑全通）

| # | 契约 | 结果 |
|---|------|------|
| 1 | 无工具目录诚实 "not found" | PASS |
| 2 | 全新落地 claude settings 注入 attnbox hooks | PASS |
| 3 | 备份 .attnbox-bak 创建 | PASS |
| 4 | 幂等：二次安装逐字节不动 | PASS |
| 5 | 坏 JSON 拒绝 exit 非 0 | PASS |
| 6 | 坏 JSON 原文件逐字节不动 | PASS |

沙箱零残留。

## 结论

- rounds 949–958 合并面后 CLI 黄金路径无回归；纯文档轮，无源码改动。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准（GitHub Actions 保持禁用）。
