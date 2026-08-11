# GAP-ROUND-783：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径（round-772 后首次）

## 实测（真实数据 @4,427 会话，迄今最大）

- `attnbox doctor`：七行全对（node ✓、claude-code hooks authoritative ✓、codex hooks.json authoritative ✓、gemini heuristic ✓、devin API key valid ✓、github-pr 无 token 诚实 "fallback inactive"、webhook 未设诚实提示）。
- `attnbox ls --waiting`：热跑 3.2s @4,427 会话，12 waiting 全部带"在等什么"预览 + 等待时长 + session/PR 行动链接。
- `attnbox hooks --install` 沙箱四态 4/4 全通：
  1. 无工具目录 → 诚实 "not found"，不制造目录；
  2. 全新安装 → claude settings.json + codex hooks.json/config.toml 双落地带 `.attnbox-bak` 备份；
  3. 幂等重跑 → "already installed"，文件逐字节不动；
  4. 坏 JSON → 拒绝并提示手工合并，原文件逐字节不动。

## 结论

CLI 黄金路径在 v0.4.8 全部健康，无 P0/P1。纯文档轮，沙箱零残留。
