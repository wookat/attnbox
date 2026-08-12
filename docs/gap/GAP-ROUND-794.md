# GAP-ROUND-794：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径（round-783 后首次，现规模 4,431）

## 实测

- `doctor` 七行全对：node ✓、claude/codex 权威 hooks ✓、gemini 诚实 heuristic ✓、devin API 探活 ✓、github-pr/webhook 未配置诚实 "–"。
- `ls --waiting` 热跑 4.3s @4,431 会话（迄今最大），10 waiting 全带"在问什么"预览 + 等待时长 + session/PR 行动链接。
- `hooks --install` 沙箱四态 4/4 全通：全新双落地（claude settings.json + codex hooks.json）、幂等重跑逐字节不动、坏 JSON 拒绝且原文件逐字节不动、无工具目录诚实 "not found"。

沙箱零残留（/tmp/hooks794-sandbox 已删）。

## 结论

CLI 黄金路径全部健康，无 P0/P1。纯文档轮。
