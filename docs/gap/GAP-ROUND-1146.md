# GAP-ROUND-1146：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1135 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 热跑 @5,535 会话（迄今最大）6 waiting 全带预览/时长/行动链接（4/6 带 PR 次级链接）、尾行计数与 API 同刻精确一致（6/30/5535，waiting id 集合逐项一致，本轮无观察竞态）、hooks --install 沙箱四态 7/7 首跑全通，无 P0/P1。**

## 结果

| # | 断言 | 结果 |
|---|------|------|
| 1 | doctor 七行全对 | PASS（node v22.23.2 / claude hooks 权威 / codex hooks.json 权威 / gemini 启发式诚实边界 / devin key 有效 ✓，github-pr/webhook 诚实 "–"） |
| 2 | ls --waiting 全带预览/时长/行动链接 | PASS（6 waiting 各卡带 detail 预览、等待时长、session URL，4/6 带 PR 次级链接；热跑 ~6.1s） |
| 3 | CLI vs API waiting 精确 id 集合一致 | PASS（CLI 尾行 6/30/5535 与 API summary 同刻精确一致；6 个 waiting id 排序后逐项相同 diff 为空，首跑即一致无竞态） |
| 4 | hooks --install 无工具目录 | PASS（诚实 "not found"，exit 0） |
| 5 | hooks --install 全新落地 | PASS（settings.json/hooks.json 合并 + `.attnbox-bak` 双备份 + codex_hooks = true，exit 0） |
| 6 | hooks --install 幂等 | PASS（二跑三文件 md5 逐字节不动，exit 0） |
| 7 | hooks --install 坏 JSON 拒绝 | PASS（exit 1、原文件 md5 逐字节不动） |

沙箱（/tmp/attnbox1146）已清理，零残留。主 daemon 4820 全程健康（total=5,535 迄今最大）。ack 台账只读未动（md5 5166cdf4…，19 条）。

## 回归面

rounds 1136–1145 合并面（#1171–#1180，全为纯文档轮）无 CLI 回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
