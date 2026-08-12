# GAP-ROUND-860 — CLI 黄金路径复走（纯文档）

Round 860. 主驱动：CLI 黄金路径复走（round-849 后首次）——doctor /
ls --waiting / hooks --install 四态，@4,510 会话（迄今最大）。

## 契约核验（全部成立）

- **doctor**：七行全对（node ✓、claude-code hooks 权威 ✓、codex
  hooks.json 权威 ✓、gemini 启发式诚实注记 ✓、devin API key 有效 ✓、
  github-pr 与 webhook 未配置诚实降级注记）。
- **ls --waiting**：热跑 3.2s@4,510 会话，12 waiting 全带预览/时长/
  session 链接（含 PR 次级链接），尾行计数与 API summary 精确一致
  （12 waiting / 50 working / 4,510 total）。
- **hooks --install 沙箱四态**：无工具目录诚实 "not found"；全新
  双落地（claude settings.json 合并保留原键 + codex hooks.json）
  带备份（`settings.json.attnbox-bak`）；幂等重跑双文件逐字节不动；
  坏 JSON 拒绝（"could not merge … fix or merge manually"、exit 1）
  且原文件逐字节不动。

## 方法注记

- 首跑 2 处假 FAIL 均为探针假设错误：备份后缀为 `.attnbox-bak`
  （非 `.bak`/`backup`）；坏 JSON 拒绝文案为 "could not merge"
  （非 invalid/parse/skip/error）。产品行为均正确，非缺陷。

## Verdict

无 P0/P1，四态全通，沙箱零残留。纯文档轮，无 changeset。
