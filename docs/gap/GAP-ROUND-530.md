# GAP-ROUND-530：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径（round-519 后首次；真实数据 3,987 会话——迄今最大）

## 证据

```text
doctor：七行全对（node ✓ / claude-code 权威 ✓ / codex 权威 ✓ / gemini 启发式 ✓ /
        devin key 有效 ✓ / github-pr 未配 – / webhook 未配 –）
ls --waiting：热跑 2.7s @3,987 会话，10 waiting 全带"在等什么"预览 + 行动链接（session + PR 次级链接）+ 等待时长
hooks --install 沙箱四态（HOME 覆盖至 /tmp/r530-hooks）：
  1) 全新安装：claude settings.json 合并 + 备份、codex hooks.json 合并 + codex_hooks=true ✓
  2) 幂等复跑：双 already installed，无重复写 ✓
  3) 已有配置保留：model 键不动、hooks 并入 ✓
  4) 坏 JSON 拒绝：报错提示手动合并、原文件一字不动 ✓
```

- 清理：沙箱删除，零残留。

## 结论

- CLI 黄金路径契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
