# GAP-ROUND-827：CLI 黄金路径复走（round-816 后首次）

日期：2026-08-04。主驱动：doctor / ls --waiting / hooks --install 四态。纯文档轮，无 P0/P1。

## 实测证据（生产 daemon @4,463 会话，迄今最大）

- `doctor` 七行全对：node/claude/codex/gemini/devin 五 ✓，github-pr 与 webhook 未配置诚实 `–` 降级提示。
- `ls --waiting` 热跑 4.0s@4,463 会话，13 waiting 全带真实提问预览 + 等待时长 + session 行动链接（3 条带 PR 次级链接）。
- `hooks --install` 沙箱四态 4/4 全通：
  1. 无工具目录 → 诚实 "not found"；
  2. 全新安装 → claude settings.json 合并 + codex hooks.json + config.toml 双落地，均带 `.attnbox-bak` 备份；
  3. 幂等重跑 → settings.json 逐字节不动；
  4. 坏 JSON → 拒绝合并并提示手动处理，原文件逐字节不动。

沙箱零残留。

## P0/P1 判定

无。

## 门禁

本地 `pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
