# GAP-ROUND-673：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-662 后首次；现规模 4,295 会话迄今最大）

## 证据

- `doctor` 七行全对：node/claude/codex/gemini/devin 五绿，github-pr 与 webhook 未配置诚实降级为 `–`。
- `ls --waiting` 热跑 3.7s @4,295 会话（迄今最大）：14 waiting 全带"在等什么"预览 + session 行动链接（含 PR 次级链接），尾行汇总 `14 waiting on you · 54 working · 4295 total` 与 API 一致。
- `hooks --install` 沙箱四态 4/4 全通：
  1. 全新安装：claude settings.json 合并 + codex hooks.json 合并均带 `.attnbox-bak` 备份；
  2. 幂等重跑：双 `already installed` 不重复写；
  3. 坏 JSON：拒绝合并、exit 1、原文件原样保留（`{bad` 未被改动）；
  4. 无工具目录：诚实 `not found` skipped，不误建配置。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。沙箱零残留。
