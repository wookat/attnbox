# GAP-ROUND-541：CLI 黄金路径复走——doctor/ls/hooks 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径（round-530 后首次；真实数据 4,009 会话——迄今最大）

## 证据

```text
doctor 七行全对：node ✓ / claude ✓（hooks 权威）/ codex ✓（hooks.json 权威）/ gemini ✓（诚实 heuristic）
  / devin ✓（key valid）/ github-pr –（诚实未配）/ webhook –（诚实未配）
ls --waiting 热跑 2.9s @4,009 会话：19 waiting 全带"在问什么"预览 + session 链接（有 PR 者带 PR 次级链接）
hooks --install 沙箱四态（HOME=<sandbox> 覆盖，round-530 注记复核成立）：
  1) 全新安装：merge + *.attnbox-bak 备份 ✓
  2) 幂等复跑：already installed，不重复改动 ✓
  3) 坏 JSON：拒绝合并、原文件字节不动 ✓
  4) 备份留存：settings.json.attnbox-bak / config.toml.attnbox-bak ✓
```

- 清理：沙箱目录删除，零残留。

## 结论

- CLI 黄金路径契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
