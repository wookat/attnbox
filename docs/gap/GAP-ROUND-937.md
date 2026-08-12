# GAP-ROUND-937: CLI 黄金路径复走（round-926 后首次）

日期：2026-08-04 ｜ 规模：4,619 会话（迄今最大） ｜ 结论：**全通，无 P0/P1**。

## 1. `attnbox doctor`（~0.18s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式（从不声称 waiting）✓、devin API key 有效 ✓、github-pr 无 token 诚实 `–` ✓、webhook 未配置诚实 `–` ✓。

## 2. `attnbox ls --waiting`（热跑 ~5.3s @4,619）

- 7 waiting 全带"在等什么"预览、等待时长、行动链接（session URL + PR 次级链接）。
- 尾行计数与 API **同刻**精确一致（before 7 / ls 7 / after 7，id 集合前后零漂移）。
- 方法注记：初次异步窗口对比出现 6 vs 7 差异，为 live 转换观察竞态（round-926 已入档同类）；改同刻取证后精确一致，非产品缺陷。

## 3. `attnbox hooks --install` 沙箱四态 6/6 首跑全通

| 态 | 结果 |
|---|---|
| 无工具目录 | ✅ 诚实 "not found"，exit 0 |
| 全新落地 | ✅ claude settings.json + codex hooks.json/config.toml 落地，带 `.attnbox-bak` 备份 |
| 幂等重跑 | ✅ "already installed"，md5 逐字节不动 |
| 坏 JSON | ✅ 拒绝合并，exit 1，原文件逐字节不动 |

沙箱（mktemp -d + HOME 重定向）已删除，零残留。

## 遗留

无新 P0/P1。
