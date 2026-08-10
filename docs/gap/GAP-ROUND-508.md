# GAP-ROUND-508：CLI 黄金路径复走——doctor/ls/hooks 四态全通，无 P0/P1

日期：2026-08-05
驱动维度：CLI 黄金路径（round-497 后首次；真实 org 数据 3,96x 会话规模）

## 证据

```text
doctor（七行）→ node ✓ / claude-code hooks 权威 ✓ / codex hooks.json 权威 ✓ /
               gemini heuristic 诚实 ✓ / devin API+key ✓ /
               github-pr 未配置诚实提示 – / webhook 未配置诚实提示 –
ls --waiting  → 热跑 2.9s @3,96x 会话，10 waiting 全带「在等什么」预览 + 行动链接
               （session URL，有 PR 的带 PR 次级链接）
hooks --install 沙箱四态（HOME=/tmp/r508-home）：
  空 HOME     → 诚实 not-found，不误装 ✓
  全新安装    → claude/codex 合并 + 备份 *.attnbox-bak ✓
  幂等重跑    → already installed，不重复写 ✓（用户自有 key 保留）
  坏 JSON     → 拒绝合并（提示手工处理），原文件一字未动 ✓
```

- 清理：沙箱 HOME 已删除，零残留。

## 结论

- CLI 黄金路径全通。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
