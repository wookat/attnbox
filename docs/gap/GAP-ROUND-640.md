# GAP-ROUND-640：CLI 黄金路径复走——doctor/ls/hooks 四态全通

日期：2026-08-05
驱动维度：CLI 黄金路径复走（round-629 后首次；doctor / ls --waiting / hooks --install 四态）

## 证据

- `doctor` 七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式注记 ✓、devin key 有效 ✓、github-pr 未配置如实提示、webhook 未配置如实提示。
- `ls --waiting` 热跑 7.0s @4,261 会话（迄今最大）：13 waiting 全带 detail 预览 + session 链接（含 PR 次级链接项）；尾行统计 `13 waiting on you · 53 working · 4261 total`。
- `hooks --install` 沙箱四态 5/5：全新 home → installed、复跑幂等 → already、缺目录 → skipped、坏 JSON → error 且不动原文件（断言用 `InstallResult.level`，既有方法注记套用零假 FAIL）。
- 沙箱目录与临时脚本已删，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
