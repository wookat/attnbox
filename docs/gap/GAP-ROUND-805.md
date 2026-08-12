# GAP-ROUND-805：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通

日期：2026-08-04
驱动维度：CLI 黄金路径（round-794 后首次，现规模 4,435）

## 实测（真实数据 + 沙箱）

doctor（七行全对）：node ✓、claude-code 权威 ✓、codex 权威 waiting/approve ✓、gemini 启发式 ✓、devin API 可达且 key 有效 ✓、github-pr 与 webhook 未配置诚实显示 `–`。

ls --waiting：热跑 5.6s @4,435 会话（迄今最大），11 waiting 全带「在等什么」预览、等待时长、session 行动链接（含 PR 次级链接），尾行汇总 `11 waiting on you · 47 working · 4435 total`。

hooks --install 沙箱四态 4/4：

1. 全新安装：claude settings.json + codex hooks.json/config.toml 双落地带备份，exit 0。
2. 幂等重跑：两文件 sha1 逐字节不动。
3. 坏 JSON：claude 拒绝合并（exit 1，提示手工处理），原文件逐字节不动。
4. 无工具目录：诚实 "not found"，exit 0。

沙箱零残留。

## 结论

CLI 黄金路径契约全部成立，无 P0/P1。纯文档轮。
