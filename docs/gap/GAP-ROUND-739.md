# GAP-ROUND-739：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-728 后首次；doctor / ls --waiting / hooks --install 四态）

## 证据（@4,355 会话，迄今最大）

- doctor 七行全对：node ✓、claude-code 权威 ✓、codex 权威 ✓、gemini 启发式 ✓、devin API ✓、github-pr 未配置诚实提示、webhook 未配置诚实提示。
- ls --waiting 热跑 3.3s @4,355 会话，7 waiting 全带预览/时长/session 行动链接（含 PR 次级链接）。
- hooks --install 沙箱四态 4/4 全通：无工具目录诚实 "not found"；全新安装双落地带备份（settings.json.attnbox-bak + config.toml.attnbox-bak + hooks.json）；幂等（重装后文件逐字节不动）；坏 JSON 拒绝且原文件逐字节不动。
- 沙箱 mktemp 隔离，跑后即删，零残留。

## 结论

CLI 黄金路径契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
