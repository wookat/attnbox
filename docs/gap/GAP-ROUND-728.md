# GAP-ROUND-728：CLI 黄金路径复走——doctor/ls/hooks 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-717 后首次；doctor / ls --waiting / hooks --install 四态）

## 证据（@4,351 会话，迄今最大）

- doctor 七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 诚实启发式 ✓、devin key 有效 ✓、github-pr/webhook 未配置诚实提示（–）。
- ls --waiting 热跑 5.8s @4,351 会话：12 waiting 全带"在问什么"预览 + 时长 + session/PR 行动链接，尾行汇总 `12 waiting on you · 37 working · 4351 total`。
- hooks --install 沙箱四态 4/4 全通：
  1. 全新安装：claude settings 合并带备份 + codex hooks.json 合并 + codex_hooks=true 双落地；
  2. 幂等：重跑双 "already installed"；
  3. 坏 JSON：拒绝合并且原文件逐字节不动（cmp 验证），codex 不受牵连；
  4. 无工具目录：诚实 "not found — is … installed?" 提示。
- 沙箱零残留（mktemp 目录已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
