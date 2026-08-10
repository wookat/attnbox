# GAP-ROUND-585：CLI 黄金路径复走——doctor/ls/hooks 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径（round-574 后首次；真实数据 4,108 会话——迄今最大）

## 实测结果

- **doctor**：七行全对——node/claude-code（hooks 权威）/codex（hooks.json 权威）/gemini（诚实启发式）/devin（API 可达 key 有效）✓，github-pr/webhook 因未配置诚实标 `–`。
- **ls --waiting**：冷跑 8.0s @4,108 会话，24 waiting 全带「在等什么」预览 + session 链接 + PR 次级链接；`--json` 24/24 detail+url。
- **hooks --install 沙箱四态**：
  1. 无 `~/.claude`/`~/.codex` → 诚实提示未安装（不误建）；
  2. 空目录初装 → merged + 备份 `*.attnbox-bak`；
  3. 幂等复跑 → already installed；
  4. 坏 JSON → 拒绝合并、原文件原样保留。

## 清理

沙箱目录删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
