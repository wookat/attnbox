# GAP-ROUND-1014: CLI 黄金路径复走（round-1003 后首次）

日期：2026-08-17。基线：main `feff355`（#1048 合并后）。结论先行：**doctor / ls --waiting / hooks --install 四态全部首跑全通，无 P0/P1。**

## 结果

### doctor（~0.15s）

七行全对：node ✓、claude-code ✓（hooks authoritative）、codex ✓（hooks.json authoritative）、gemini ✓（heuristic 诚实边界）、devin ✓（API key valid）、github-pr –（无 token 诚实 inactive）、webhook –（未配置诚实提示）。

### ls --waiting（热跑 ~5.2s @5,420 会话，迄今最大）

- 13 waiting 全带预览/时长/行动链接（session URL + PR 次级链接）。
- 尾行计数与 API 同刻精确一致：13/47/5420 == API waiting=13 working=47 total=5420（本轮无观察竞态）。

### hooks --install 沙箱四态（6/6 首跑全通）

| 态 | 结果 |
|---|---|
| 无工具目录 | 诚实 "not found"，exit 0 |
| 全新落地 | claude settings.json + codex hooks.json 落地，带 .attnbox-bak 备份 |
| 幂等重跑 | "already installed"，两文件 md5 逐字节不动 |
| 坏 JSON | 拒绝合并，exit 1，原文件 md5 逐字节不动 |

沙箱零残留。rounds 1004–1013 合并面无 CLI 回归。

## 证据

- 本地门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。
