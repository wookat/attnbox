# GAP-ROUND-926 — CLI 黄金路径复走（纯文档）

Round 926. 主驱动：doctor / ls --waiting / hooks --install 四态复走——round-915 后首次。证据日期：2026-08-04，@4,607 会话（迄今最大）。

## 复走结果

- `doctor` 七行全对（~0.17s）：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式边界诚实 ✓、devin API ✓、github-pr / webhook 未配置诚实降级提示。
- `ls --waiting` 热跑 ~7.0s @4,607 会话：19 waiting 全带预览/时长/行动链接（session + PR 次级链接），尾行计数与 API 同刻精确一致（19==19）。
- 方法注记：跨窗口对比曾见 19/20/21 漂移，为 live waiting 真实转换的观察窗口竞态（round-911 同类），同刻复测精确一致，非产品缺陷。
- `hooks --install` 沙箱四态 6/6 首跑全通：无工具目录诚实 "not found"、全新落地带 .attnbox-bak 备份、幂等逐字节不动、坏 JSON 拒绝 exit 非 0 且原文件逐字节不动。沙箱零残留。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
