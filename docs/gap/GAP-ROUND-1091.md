# GAP-ROUND-1091：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1080 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 热跑 ~7.2s@5,475 会话（迄今最大）、hooks --install 沙箱四态 4/4 首跑全通，无 P0/P1。**

## 结果

| # | 断言 | 结果 |
|---|------|------|
| 1 | doctor 七行全对（~0.26s） | PASS（node/claude/codex/gemini/devin ✓，github-pr/webhook 诚实 "–"） |
| 2 | ls --waiting 全带预览/时长/行动链接 | PASS（8 waiting 各带 detail 预览、等待时长、session URL，含 PR 次级链接） |
| 3 | 尾行计数与 API 一致 | PASS（一次 8 vs 7 差异经 `--json` id 集合比对定位为真实 live 转换：`devin-2648fdb2…` 观察间隙离开 waiting；`--json` 复跑 7==7 与 API 同刻精确一致，5475 total） |
| 4 | hooks --install 无工具目录 | PASS（诚实 "not found"，exit 0） |
| 5 | hooks --install 全新落地 | PASS（settings.json/hooks.json 合并 + `.attnbox-bak` 备份 + codex_hooks=true） |
| 6 | hooks --install 幂等 | PASS（二跑 "already installed"，两文件 md5 逐字节不动） |
| 7 | hooks --install 坏 JSON 拒绝 | PASS（exit 1、诚实报错、原文件 md5 逐字节不动） |

沙箱（mktemp -d）已清理，零残留。主 daemon 4820 全程健康。

## 回归面

rounds 1081–1090 合并面（#1116–#1125，全为纯文档轮）无 CLI 回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
