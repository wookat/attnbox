# GAP-ROUND-816：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径（round-805 后首次，现规模 4,438+）

## 实测

### doctor（七行全对）

- ✓ node v22.23.2；✓ claude-code hooks 权威；✓ codex hooks.json 权威 waiting/approve；
- ✓ gemini heuristic 诚实注记；✓ devin API reachable, key valid；
- – github-pr / – webhook 未配置项诚实降级提示。

### ls --waiting（热跑 3.8s @4,438 会话——迄今最大）

- 13 waiting 全带预览（detail）+ 等待时长 + 行动链接（session URL，含 PR 次级链接）。
- 汇总行正确：`13 waiting on you · 40 working · 4438 total`。

### hooks --install（沙箱四态 4/4 全通）

1. 全新安装：claude settings.json 合并 + codex hooks.json/config.toml 双落地，均带 `.attnbox-bak` 备份。
2. 幂等：二次运行报 already installed，三文件逐字节不动（md5 一致）。
3. 坏 JSON：拒绝合并并提示手工处理，原文件逐字节不动。
4. 无工具目录：诚实 `not found — is … installed?`。

沙箱零残留。

## 结论

CLI 黄金路径全部健康，无 P0/P1。纯文档轮。
