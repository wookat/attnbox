# GAP-ROUND-706：CLI 黄金路径复走——doctor/ls/hooks 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径（round-695 后首次；doctor / ls --waiting / hooks --install 四态）

## 证据（@4,323 会话，迄今最大）

- doctor 七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 诚实 heuristic ✓、devin API 探活 ✓、github-pr/webhook 未配置诚实提示。
- ls --waiting 热跑 6.7s @4,323 会话：28 waiting 全带预览/时长/行动链接（28/28 有 session 或 PR 链接）。
- hooks --install 沙箱四态 4/4 全通：
  - 全新安装：claude settings.json + codex hooks.json 双落地带备份；
  - 幂等：二跑 "already installed" 不重复写；
  - 坏 JSON：拒绝合并且原文件逐字节不动（BAD_JSON_UNTOUCHED）；
  - 无工具目录：诚实 "not found" 提示。

沙箱零残留（/tmp/r706-* 已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
