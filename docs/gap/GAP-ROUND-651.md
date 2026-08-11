# GAP-ROUND-651：CLI 黄金路径复走——doctor/ls/hooks 四态全通

日期：2026-08-11
驱动维度：CLI 黄金路径（round-640 后首次；doctor / ls --waiting / hooks --install 沙箱四态）

## 实测（真实构建产物）

- doctor 七行全对：node ✓、claude-code hooks authoritative ✓、codex hooks.json authoritative ✓、gemini heuristic 边界诚实 ✓、devin API key valid ✓、github-pr / webhook 未配置以 `–` 诚实标注。
- `ls --waiting` 热跑 3.4s @4,277 会话（迄今最大）：9 waiting 全带 detail 预览 + session 链接（含 PR 次级链接），尾行计数 `9 waiting on you · 48 working · 4277 total` 正确。
- hooks --install 沙箱（installHooks(home) 直调，7/7 全通）：
  - 无 ~/.claude、~/.codex 时诚实 `skipped`（不误创建）；
  - fresh 安装两采集器 hooks 成功且文件落盘；
  - 幂等重跑无 error；
  - 已有 settings.json 合并保留原字段（theme 不丢）；
  - 坏 JSON 拒绝安装且原文件一字不动。
- 方法注记：installHooks 对不存在的工具目录返回 skipped 而非创建——沙箱探针须先 mkdir ~/.claude、~/.codex 再断言 installed（本轮首跑 1 处假 FAIL 由此排除，非产品缺陷）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
