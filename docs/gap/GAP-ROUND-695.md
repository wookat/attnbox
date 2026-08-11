# GAP-ROUND-695：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-684 后首次，现规模 4,312）

## 证据

- doctor 七行全对（node ✓、claude/codex hooks 权威 ✓、gemini 启发式声明 ✓、devin key valid ✓、github-pr/webhook 未配置诚实提示）。
- ls --waiting 热跑 3.9s @4,312 会话（迄今最大），19 waiting 全带预览/时长/session 链接（含 PR 次级链接）。
- hooks --install 沙箱四态 4/4 全通：无工具目录诚实提示不写文件、全新安装 claude+codex 双落地、幂等重跑文件不变、坏 JSON 拒绝且原文件原样保留。

方法注记（探针侧，非产品缺陷）：无工具目录态的诚实提示文案为"~/.claude not found — is Claude Code installed?"而非含"skip"字样——断言正则须匹配 not found（首跑 1 处假 FAIL 即此因）。

沙箱零残留（mkdtemp 目录已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
