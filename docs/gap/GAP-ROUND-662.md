# GAP-ROUND-662：CLI 黄金路径复走——doctor/ls/hooks 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-651 后首次；doctor / ls --waiting / hooks --install 四态）

## 证据（@4,279 会话，迄今最大）

- doctor 七行全对：node ✓ / claude-code hooks 权威 ✓ / codex hooks.json 权威 ✓ / gemini 诚实边界 ✓ / devin key 有效 ✓ / github-pr 与 webhook 未配置如实提示。
- ls --waiting 热跑 3.5s @4,279 会话：8 waiting 全带"在等什么"预览 + session/PR 行动链接，汇总行 8 waiting / 43 working / 4,279 total。
- hooks --install 沙箱 8/8 全通：无工具目录诚实 skipped、全新安装 installed（settings.json + hooks.json 落盘）、二跑幂等 already、合并保留既有键、坏 JSON 拒绝（error）且不动原文件。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
- 沙箱零残留（临时 home 目录与探针脚本已删除）。
