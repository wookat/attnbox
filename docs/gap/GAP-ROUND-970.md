# GAP-ROUND-970：CLI 黄金路径复走（round-959 后首次）

日期：2026-08-04。结论先行：**doctor / ls --waiting / hooks --install 全部符合契约，无 P0/P1。**

## 核查面

- `doctor`：七行全对（~0.17s）——node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式边界诚实标注 ✓、devin key 有效 ✓、github-pr/webhook 未配置诚实降级提示 ✓。
- `ls --waiting`：热跑 ~4.1s @5,341 会话（迄今最大），17 waiting 全带预览/时长/行动链接（session + PR 次级链接）；尾行计数与 API 受控复测同刻精确一致（17 waiting · 47 working · 5341 total == API 17/47/5341）。首跑一次 17 vs 18 差异为 live 转换观察竞态（rounds 926/937 已入档同类非缺陷），受控复测消除。
- `hooks --install` 沙箱四态 6/6 首跑全通：无工具目录诚实 "not found"；全新落地带 .attnbox-bak 备份；幂等重装逐字节不动；坏 JSON 拒绝 exit 非 0 且原文件逐字节不动。沙箱零残留。

## 结论

- 无 P0/P1；纯文档轮；
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准。
