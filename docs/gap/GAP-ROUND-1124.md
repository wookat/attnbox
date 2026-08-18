# GAP-ROUND-1124：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1113 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 热跑 @5,510 会话（迄今最大）8 waiting 全带预览/时长/行动链接、CLI vs API 首跑一例 7 vs 8 差异经精确 id 集合比对定位为真实 live 转换（devin-4cdb27ae… 观察间隙短暂离开 waiting，~45s 后复跑 CLI/API 8==8 id 集合完全一致）非缺陷、hooks --install 沙箱四态 6/6 首跑全通，无 P0/P1。**

## 结果

| # | 断言 | 结果 |
|---|------|------|
| 1 | doctor 七行全对 | PASS（node/claude/codex/gemini/devin ✓，github-pr/webhook 诚实 "–"；~0.2s） |
| 2 | ls --waiting 全带预览/时长/行动链接 | PASS（8 waiting 各带 detail 预览、等待时长、session URL，部分带 PR 次级链接） |
| 3 | CLI vs API waiting 精确 id 集合一致 | PASS（首跑 CLI 7 vs API 8，差集恰为 devin-4cdb27ae… 一项；复跑 8==8 且 id 集合逐项相同，判定为观察间隙真实 live 转换非缺陷；summary 8/32/5510） |
| 4 | hooks --install 无工具目录 | PASS（诚实 "not found"，exit 0） |
| 5 | hooks --install 全新落地 | PASS（settings.json/hooks.json 合并 + `.attnbox-bak` 双备份） |
| 6 | hooks --install 幂等 | PASS（二跑两文件 md5 逐字节不动） |
| 7 | hooks --install 坏 JSON 拒绝 | PASS（exit ≠0、原文件 md5 逐字节不动） |

沙箱（mktemp -d）已清理，零残留。主 daemon 4820 全程健康（total=5,510 迄今最大）。

## 回归面

rounds 1114–1123 合并面（#1149–#1158，全为纯文档轮）无 CLI 回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
