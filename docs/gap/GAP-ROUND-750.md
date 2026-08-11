# GAP-ROUND-750：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-739 后首次；现规模 4,372+）

## 证据

- doctor 七行全对（node/claude/codex/gemini/devin ✓，github-pr/webhook 诚实 "–"）。
- ls --waiting 热跑 3.6s @4,372 会话（迄今最大），17 waiting 全带预览/时长/行动链接。
- hooks --install 沙箱四态 4/4 全通：全新双落地带备份、幂等（already installed）、坏 JSON 拒绝且原文件逐字节不动、无工具目录诚实 "not found"。
- 沙箱零残留（临时目录已删）。

## 结论

CLI 黄金路径契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
