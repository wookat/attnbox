# GAP-ROUND-684：CLI 黄金路径复走——doctor/ls/hooks 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-673 后首次；doctor / ls --waiting / hooks --install 四态）

## 证据（@4,304 会话）

- `attnbox doctor` 七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 诚实边界 ✓、devin API ✓、github-pr 未配置诚实 `–`、webhook 未配置诚实 `–`。
- `attnbox ls --waiting` 热跑 4.0s@4,304 会话：14 waiting 全带预览（detail 摘要）+ 行动链接（session URL，含 PR 次级链接）+ 等待时长。
- `hooks --install` 沙箱四态 4/4 全通：
  1. 全新安装：claude 合并 settings.json（备份 .attnbox-bak）+ codex hooks.json 合并 ✓。
  2. 幂等重跑：双双 "already installed" ✓。
  3. 坏 JSON：拒绝合并、提示手工处理、原文件原样保留 ✓。
  4. 无工具目录：诚实 "not found — is … installed?" skipped ✓。

沙箱零残留（/tmp/hk684* 已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
