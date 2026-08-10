# GAP-ROUND-563：CLI 黄金路径复走——doctor/ls/hooks 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径（round-552 后首次；真实数据 4,034 会话——迄今最大）

## 证据

```text
doctor：七行全对
  ✓ node / claude-code（authoritative）/ codex（authoritative）/ gemini（heuristic 且从不声称 waiting）/ devin（API+key 有效）
  – github-pr / webhook 未配置项诚实提示
ls --waiting：冷跑 4.8s @4,034 会话
  11 waiting 全带 [attention] 标注 + detail 预览 + session/PR 行动链接
  尾行汇总 "11 waiting on you · 37 working · 4034 total" 一致
hooks --install 沙箱四态全通：
  1) 全新安装：merge + backup ✓
  2) 幂等复跑：already installed ✓
  3) 坏 JSON：拒绝合并 + 原文件原样保留（{broken 未动）✓
  4) 已有配置：merge + backup ✓
```

- 清理：沙箱删除，零残留。

## 结论

- CLI 黄金路径全部健康。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
