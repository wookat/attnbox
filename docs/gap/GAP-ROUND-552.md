# GAP-ROUND-552：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径（round-541 后首次；真实数据 4,019 会话规模）

## 证据

```text
doctor 七行全对：node ✓ / claude-code ✓（hooks 权威）/ codex ✓（hooks.json 权威）
  / gemini ✓（诚实降级注记）/ devin ✓（API 探活）/ github-pr –（无 token 诚实降级）
  / webhook –（未配置诚实提示）
ls --waiting：冷跑 8.3s / 热跑 10.4s @4,019 会话（15 waiting，前次热跑基线同量级）
  15/15 全带 detail 预览 + session 行动链接（含 PR 次级链接），零缺失
hooks --install 沙箱四态：
  ① 无 ~/.claude/~/.codex → 双诚实降级提示 ✓
  ② 正常安装 → merged + 备份 *.attnbox-bak ✓
  ③ 幂等重跑 → already installed，不重复写 ✓
  ④ 坏 JSON → 拒绝合并、原文件一字不动（{broken 保留）✓
```

- 清理：沙箱目录/临时输出删除，零残留。

## 结论

- CLI 三条黄金路径契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
