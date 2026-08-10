# GAP-ROUND-519：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径（round-508 后首次；真实数据 3,973 会话——迄今最大）

## 证据

### doctor（七行全对）

```text
✓ node / ✓ claude-code（hooks authoritative）/ ✓ codex（hooks.json authoritative）
✓ gemini（heuristic working/idle only, never claims waiting）/ ✓ devin（API reachable, key valid）
– github-pr（无 token，fallback inactive）/ – webhook（未配置，诚实提示）
```

### ls --waiting

```text
热跑 4.0s @3,973 会话（迄今最大）：9 waiting 全带「在等什么」预览 + 行动链接
（session 主链接 + PR 次级链接），等待时长标注 10m–1d。
尾行汇总：9 waiting on you · 34 working · 3973 total
```

### hooks --install 沙箱四态

```text
1) 全新安装：claude settings.json + codex hooks.json/config.toml 落盘，备份 *.attnbox-bak
2) 幂等复跑：两行 already installed，零改动
3) 已有自定义 settings：合并 + 备份，custom 字段保留（preserved: true）
4) 坏 JSON：拒绝合并（"could not merge … fix or merge manually"），原文件逐字未动
```

- 清理：沙箱删净，零残留。

## 结论

- CLI 黄金路径四态全通 @3,973。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
