# GAP-ROUND-1135：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1124 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 热跑 @5,525 会话（迄今最大）9 waiting 全带预览/时长/行动链接、CLI vs API 首跑一例 8 vs 7 差异按 round-1124 方法注记以精确 id 集合复跑定位为真实 live 转换（复跑 9==9 id 集合逐项一致）非缺陷、hooks --install 沙箱四态 6/6 首跑全通，无 P0/P1。**

## 结果

| # | 断言 | 结果 |
|---|------|------|
| 1 | doctor 七行全对 | PASS（node v22.23.2 / claude hooks 权威 / codex hooks.json 权威 / gemini 启发式诚实边界 / devin key 有效 ✓，github-pr/webhook 诚实 "–"） |
| 2 | ls --waiting 全带预览/时长/行动链接 | PASS（waiting 各卡带 detail 预览、等待时长、session URL，部分带 PR 次级链接；热跑 ~6.8s） |
| 3 | CLI vs API waiting 精确 id 集合一致 | PASS（首跑 CLI 8 vs API 7 为观察间隙 live 转换；复跑 CLI/API 9==9 且排序后 id 集合逐项相同 diff 为空；尾行计数与 API 同刻一致 9/29/5525） |
| 4 | hooks --install 无工具目录 | PASS（诚实 "not found"） |
| 5 | hooks --install 全新落地 | PASS（settings.json/hooks.json 合并 + `.attnbox-bak` 双备份） |
| 6 | hooks --install 幂等 | PASS（二跑两文件 md5 逐字节不动） |
| 7 | hooks --install 坏 JSON 拒绝 | PASS（exit ≠0、原文件 md5 逐字节不动） |

沙箱（mktemp -d）已清理，零残留。主 daemon 4820 全程健康（total=5,525 迄今最大）。

## 回归面

rounds 1125–1134 合并面（#1160–#1169，全为纯文档轮）无 CLI 回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
