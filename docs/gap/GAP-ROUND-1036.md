# GAP-ROUND-1036: CLI 黄金路径复走（round-1025 后首次）

日期：2026-08-17。基线：main `164e680`（#1070 合并后）。结论先行：**doctor 七行全对、ls --waiting 与 API 同刻精确一致、hooks --install 沙箱四态 6/6 首跑全通。无 P0/P1**。

## 方法

本地 `pnpm build` 后直跑 `packages/cli/dist/index.js`；hooks 用 `HOME=$(mktemp -d)` 沙箱四态，零残留。

## 结果

### doctor（~0.98s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式（从不声称 waiting）✓、devin API key 有效 ✓、github-pr 无 token 诚实降级 –、webhook 未配置诚实提示 –。

### ls --waiting（热跑 ~9.1s @5,435 会话，迄今最大）

- 7 waiting 全带"在等什么"预览、等待时长、session 主链接与 PR 次级链接。
- 尾行计数与 API 同刻精确一致：`7 waiting on you · 38 working · 5435 total` == API waiting 7 / working 38 / total 5,435（本轮无观察竞态）。

### hooks --install 沙箱四态（6/6 首跑全通）

| 检查 | 结果 |
|------|------|
| 无工具目录诚实 "not found" | PASS |
| 全新落地带 .attnbox-bak 备份（claude/codex 各一） | PASS ×2 |
| 安装后配置含 attnbox hook | PASS |
| 幂等复跑 md5 逐字节不动 | PASS |
| 坏 JSON 拒绝 exit 非 0 且原文件逐字节不动 | PASS |

## 判定

rounds 1026–1035 合并面无 CLI 回归。无 P0/P1，本轮纯文档入档。
