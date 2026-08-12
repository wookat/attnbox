# GAP-ROUND-915 — CLI 黄金路径复走（纯文档）

Round 915. 主驱动：doctor / ls --waiting / hooks --install 四态复走——round-904 后首次。证据日期：2026-08-04。规模 @4,580 会话（迄今最大）。

## 审计结果（首跑全通）

- **doctor**：七行全对（node/claude/codex/gemini/devin ✓，github-pr/webhook 诚实降级提示），~0.19s；
- **ls --waiting**：热跑 ~5.7s @4,580 会话，18 waiting 全带「在等什么」预览、等待时长与行动链接（session + PR 次级链接），尾行计数 `18 waiting on you · 35 working · 4580 total` 与 API 同刻精确一致（18==18、4580==4580）；
- **hooks --install 沙箱四态**（6/6）：无工具目录诚实 "not found"；全新落地带 `.attnbox-bak` 备份；幂等第二次安装逐字节不动；坏 JSON 拒绝 exit 非 0 且原文件逐字节不动。

沙箱（temp HOME）零残留。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
