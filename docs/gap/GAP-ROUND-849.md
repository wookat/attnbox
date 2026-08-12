# GAP-ROUND-849 — CLI 黄金路径复走（纯文档）

Round 849. 主驱动：doctor / ls --waiting / hooks --install 四态复走
（round-838 后首次，现规模 4,500 会话，迄今最大）。

## doctor（7/7 全对）

- node / claude-code（hooks 权威）/ codex（hooks.json 权威）/
  gemini（诚实启发式边界）/ devin（API 可达、key 有效）全 ✓；
  github-pr 与 webhook 未配置诚实显示 `–`。

## ls --waiting（热跑 4.6s @4,500）

- 19 waiting 全带 [attention] 标记、等待时长、detail 预览、
  session 主链接与 PR 次级链接；尾行 `19 waiting on you · 42
  working · 4500 total` 与 API 一致。

## hooks --install 沙箱四态（4/4 全通）

1. 全新安装：claude settings.json + codex hooks.json/config.toml
   双落地带 `.attnbox-bak` 备份。
2. 幂等重跑："already installed"，两文件逐字节不动。
3. 坏 JSON：拒绝合并且原文件逐字节不动，codex 侧不受影响。
4. 无工具目录：诚实 "not found — is … installed?"。

## Verdict

无 P0/P1：CLI 黄金路径在 4,500 会话规模全部健康。沙箱零残留。
纯文档轮，无 changeset。
