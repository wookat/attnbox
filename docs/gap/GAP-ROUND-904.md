# GAP-ROUND-904 — CLI 黄金路径复走（纯文档）

Round 904. 主驱动：doctor / `ls --waiting` / `hooks --install` 四态（round-893 后首次）。证据日期：2026-08-04。

## doctor（~0.15s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式（从不声称 waiting）✓、devin API key 有效 ✓、github-pr 无 token 诚实降级 –、webhook 未配置诚实提示 –。

## ls --waiting（热跑 ~7.8s @4,569 会话，迄今最大）

24 waiting 全带"在等什么"预览 + 等待时长 + 行动链接（session 主链接、PR 次级链接）；尾行计数 `24 waiting on you · 40 working · 4569 total` 与 API summary 精确一致。

## hooks --install 沙箱四态（6/6 首跑全通）

- 无工具目录 → 诚实 "not found"。
- 全新目录 → Claude settings 落地 attnbox hooks 且带 `.attnbox-bak` 备份。
- 幂等 → 二次安装逐字节不动。
- 坏 JSON → 拒绝（exit 非 0）且原文件逐字节不动。

沙箱零残留。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
