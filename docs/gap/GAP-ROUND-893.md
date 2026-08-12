# GAP-ROUND-893 — CLI 黄金路径复走（纯文档）

Round 893. 主驱动：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）——round-882 后首次。证据窗口：2026-08-04，live daemon @4,556 会话（迄今最大）。

## doctor（~0.16s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式（从不声称 waiting）✓、devin key valid ✓、github-pr 诚实"fallback inactive"（无 token）、webhook 诚实"not set"。

## ls --waiting（热跑 ~4.6s @4,556）

- 15 waiting 全带"在问什么"预览 + 等待时长 + 行动链接（session 主链接 + PR 次级链接）。
- 尾行计数与 API 精确一致：`15 waiting on you · 50 working · 4556 total` vs `/api/items` summary waiting=15 / total=4556。

## hooks --install 沙箱四态（6/6 首跑全通）

1. 无工具目录 → 诚实 "not found"。
2. 全新 Claude/Codex 配置 → 双落地 attnbox hooks + `.attnbox-bak` 备份。
3. 幂等：二次安装逐字节不动。
4. 坏 JSON → 拒绝（exit 非 0）且原文件逐字节不动。

沙箱临时 HOME，用后删除，零残留。

## Verdict

无 P0/P1。纯文档轮，无 changeset。
