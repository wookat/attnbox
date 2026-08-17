# GAP-ROUND-1003: CLI 黄金路径复走（round-992 后首次）

日期：2026-08-04。主驱动：doctor / ls --waiting / hooks --install 四态（沙箱法，同 round-992）。结论先行：**doctor 七行全对、ls 与 API 同刻精确一致、hooks 沙箱 6/6 首跑全通，无 P0/P1**。

## doctor（~0.16s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式边界诚实 ✓、devin API key 有效 ✓、github-pr 未配置诚实 "–" ✓、webhook 未配置诚实 "–" ✓。

## ls --waiting（热跑 ~4.5s @5,412 会话，迄今最大）

- 13 waiting 全带预览（└ detail）+ 等待时长 + 行动链接（session URL，含 PR 次级链接）——13 卡 26 条 └ 行。
- 尾行计数 `13 waiting on you · 54 working · 5412 total` 与 API 同刻精确一致（13/54/5,412，本轮无观察竞态）。

## hooks --install 沙箱四态（6/6 首跑全通）

1. 无工具目录 → 诚实 "not found"。
2. 全新落地带 `.attnbox-bak` 备份（claude + codex）。
3. 幂等复跑逐字节不动（md5 一致）。
4. 坏 JSON 拒绝：exit 非 0 且原文件逐字节不动。

沙箱零残留（mktemp 目录已删）。

## 结论

rounds 993–1002 合并面无 CLI 回归。无 P0/P1；本轮纯文档。继续循环。
