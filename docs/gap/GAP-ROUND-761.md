# GAP-ROUND-761：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径（round-750 后首次）

## 证据

- `doctor` 七行全对：node ✓、claude-code 权威 hooks ✓、codex 权威 hooks.json ✓、gemini 启发式 ✓、devin API ✓、github-pr/webhook 未配置诚实提示。
- `ls --waiting` 热跑 5.0s @4,398 会话（迄今最大），13 waiting 全带「在等什么」预览 + 等待时长 + session/PR 行动链接。
- `hooks --install` 沙箱四态 4/4 全通：
  1. 全新安装双落地带备份（claude settings.json + codex hooks.json/config.toml，*.attnbox-bak）；
  2. 幂等重跑逐字节不动；
  3. 坏 JSON 拒绝合并且原文件逐字节不动，codex 侧不受影响；
  4. 无工具目录诚实 "not found"。
- 沙箱零残留（mktemp + rm -rf）。

## 结论

CLI 黄金路径契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
