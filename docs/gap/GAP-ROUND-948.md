# GAP-ROUND-948: CLI 黄金路径复走（round-937 后首次）

日期：2026-08-04 ｜ 规模：4,622 会话（迄今最大） ｜ 结论：**全通，无 P0/P1**。

## 1. `attnbox doctor`（~0.15s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式（从不声称 waiting）✓、devin API key 有效 ✓、github-pr 无 token 诚实 `–` ✓、webhook 未配置诚实 `–` ✓。

## 2. `attnbox ls --waiting`（热跑 ~3.3s @4,622）

- 5 waiting 全带"在等什么"预览、等待时长、行动链接（session URL + PR 次级链接）。
- 尾行计数 `5 waiting on you · 38 working · 4622 total` 与 API 同刻精确一致（waiting 5 / total 4,622）。

## 3. `attnbox hooks --install` 沙箱四态 6/6 首跑全通

| 态 | 结果 |
|---|---|
| 无工具目录 | ✅ 诚实 "not found"，exit 0 |
| 全新落地 | ✅ claude settings.json + codex hooks.json 落地，带 `.attnbox-bak` 备份 |
| 幂等重跑 | ✅ 逐字节不动 |
| 坏 JSON | ✅ 拒绝合并，exit 非 0，原文件逐字节不动 |

沙箱（mktemp -d + HOME 重定向）已删除，零残留。

## 遗留

无新 P0/P1。

## 验收（Actions 降级门禁）

本地全绿：`pnpm lint` ✓ / `pnpm typecheck` ✓ / `pnpm build` ✓ / `pnpm test` 99 ✓。
