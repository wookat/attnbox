# GAP-ROUND-772：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径（round-761 后首次）

## 证据（真实数据 4,416+ 会话）

- `doctor` 七行全对：node/claude-code（hooks 权威）/codex（hooks.json 权威）/gemini（诚实启发式）/devin（API 可达）三 ✓ 两 –（github-pr、webhook 未配置的诚实提示）。
- `ls --waiting` 热跑 3.1s：14 waiting 全带预览/时长/行动链接（session + PR 次级链接）。
- `hooks --install` 沙箱四态 4/4 全通：
  1. 全新安装：双落地（.claude/settings.json + .codex/hooks.json）带 .attnbox-bak 备份。
  2. 幂等：二次运行配置逐字节不动。
  3. 坏 JSON：退出码 1 拒绝且原文件逐字节不动。
  4. 无工具目录：诚实 "not found"，退出码 0。
- 沙箱零残留（/tmp fixture 已删）。

## 结论

CLI 黄金路径契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
