# GAP-ROUND-871 — CLI 黄金路径复走（纯文档）

Round 871. 主驱动：doctor / ls --waiting / hooks --install 四态
（round-860 后首次），@4,526 会话（迄今最大）。

## 证据

- `doctor` 七行全对：node ✓、claude-code hooks 权威 ✓、codex
  hooks.json 权威 ✓、gemini 启发式 ✓、devin key 有效 ✓、
  github-pr 未配置诚实 `–`、webhook 未配置诚实 `–`。
- `ls --waiting` 热跑 3.2s @4,526 会话，14 waiting 全带预览/时长/
  行动链接（session + PR 次级链接），尾行计数
  `14 waiting on you · 52 working · 4526 total` 与 API
  summary.waiting=14 精确一致。
- `hooks --install` 沙箱四态 4/4 全通：
  1. 全新安装：claude settings.json + codex hooks.json 双落地，
     带 `.attnbox-bak` 备份；
  2. 幂等：二次安装后 settings.json 逐字节不动；
  3. 坏 JSON：拒绝合并（`! could not merge … fix or merge manually`），
     原文件逐字节不动；
  4. 无工具目录：诚实 `~/.claude not found` / `~/.codex not found`。
- 沙箱（3 个 mktemp HOME）已全部清理，零残留。

## Verdict

无 P0/P1。纯文档轮，无 changeset。
