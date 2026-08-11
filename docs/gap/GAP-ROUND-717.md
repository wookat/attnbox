# GAP-ROUND-717：CLI 黄金路径复走——doctor/ls/hooks 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-706 后首次；doctor / ls --waiting / hooks --install 四态）

## 证据（@4,345+ 会话，迄今最大）

- doctor 七行全对：node/claude-code（authoritative）/codex（hooks.json authoritative）/gemini（诚实降级）/devin（key valid）三 ✓，github-pr/webhook 两 – 诚实提示。
- ls --waiting 热跑 9.1s@4,345+ 会话，10 waiting 全带预览/时长/session 行动链接（含 PR 次级链接）。
- hooks --install 沙箱四态 4/4 全通：全新安装双落地带备份（settings.json.attnbox-bak + codex *.attnbox-bak）、幂等（already installed）、坏 JSON 拒绝且不动原文件、无工具目录诚实 "not found"。
- 沙箱零残留。

## 结论

- CLI 黄金路径全部符合契约。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
