# GAP-ROUND-1080：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1069 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting @5,465 会话（迄今最大）尾行计数与 API 同刻精确一致、hooks --install 沙箱四态全通。无 P0/P1。**

## 方法

- 本地 `pnpm build` 后直跑 `node packages/cli/dist/index.js`（doctor / ls --waiting），对照主 daemon `http://127.0.0.1:4820/api/items` 同刻计数。
- hooks --install 用 `HOME=$(mktemp -d)` 隔离沙箱走四态：无工具目录 / 全新落地 / 幂等重跑 / 坏 JSON 拒绝；md5 逐字节比对；沙箱轮末删除零残留。

## 结果

- doctor 七行全对（~0.26s）：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式 ✓、devin key 有效 ✓、github-pr/webhook 未配置诚实 `–`。
- ls --waiting 热跑 ~4.6s @5,465 会话（迄今最大）：5 waiting 全带"在等什么"预览、等待时长（4m–2d）、session 主链接与 PR 次级链接；尾行 `5 waiting on you · 33 working · 5465 total` 与 API 同刻 5/33/5465 精确一致（本轮无观察竞态）。
- hooks --install 沙箱四态 4/4 首跑全通：
  - 无 `.claude`/`.codex` 目录：诚实 "not found"，exit 0。
  - 全新落地：merged + `.attnbox-bak` 备份，codex 同时置 `codex_hooks = true`。
  - 幂等重跑："already installed"，settings.json/hooks.json md5 逐字节不动。
  - 坏 JSON：拒绝并 exit 非 0，原文件 md5 逐字节不动。
- 沙箱已删除，零残留；主 daemon 4820 全程健康。

## 结论

- 无 P0/P1；纯文档轮。rounds 1070–1079 合并面无 CLI 回归。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
