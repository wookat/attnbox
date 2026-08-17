# GAP-ROUND-1113：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1102 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 热跑 ~4.5s@5,497 会话（迄今最大）尾行计数与 API 同刻精确一致、hooks --install 沙箱四态 4/4 首跑全通，无 P0/P1。**

## 结果

| # | 断言 | 结果 |
|---|------|------|
| 1 | doctor 七行全对 | PASS（node/claude/codex/gemini/devin ✓，github-pr/webhook 诚实 "–"；~0.2s） |
| 2 | ls --waiting 全带预览/时长/行动链接 | PASS（10 waiting 各带 detail 预览、等待时长、session URL，6/10 带 PR 次级链接） |
| 3 | 尾行计数与 API 一致 | PASS（10 waiting / 33 working / 5497 total 与 `/api/items` summary 同刻精确一致，本轮无观察竞态） |
| 4 | hooks --install 无工具目录 | PASS（诚实 "not found"，exit 0） |
| 5 | hooks --install 全新落地 | PASS（settings.json/hooks.json 合并 + `.attnbox-bak` 双备份 + codex_hooks=true 写入） |
| 6 | hooks --install 幂等 | PASS（二跑两文件 md5 逐字节不动） |
| 7 | hooks --install 坏 JSON 拒绝 | PASS（exit 1、原文件 md5 逐字节不动、codex 侧不受影响） |

沙箱（mktemp -d）已清理，零残留。主 daemon 4820 全程健康（total=5,497 迄今最大）。

## 回归面

rounds 1103–1112 合并面（#1138–#1147，全为纯文档轮）无 CLI 回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
