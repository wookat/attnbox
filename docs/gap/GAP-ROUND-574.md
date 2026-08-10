# GAP-ROUND-574：CLI 黄金路径复走——doctor/ls/hooks 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径复走（round-563 后首次；真实数据 4,070 会话——迄今最大）

## 证据

### doctor（七行全对）

```text
✓ node / ✓ claude-code hooks 权威 / ✓ codex hooks.json 权威 / ✓ gemini（诚实 heuristic）
✓ devin API key 有效 / – github-pr 兜底未配置（诚实提示）/ – webhook 未配置（诚实提示）
```

### ls --waiting（热跑 7.1s @4,070 会话）

```text
18 waiting on you · 56 working · 4070 total
18/18 waiting 项全带「在等什么」预览 + session 行动链接（含 PR 次级链接）
```

### hooks --install（沙箱 HOME 四态，round-534 方法注记套用）

```text
1) 无 ~/.claude、~/.codex：诚实跳过不误建
2) 幂等：重复安装同样输出、不重复写
3) 既有 settings.json：hooks 合并 + env.FOO 保留 + .attnbox-bak 备份
4) 坏 JSON：拒绝合并、原文件原样保留
```

- 清理：沙箱目录删除，零残留。

## 结论

- CLI 黄金路径在迄今最大规模下全通。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
