# GAP-ROUND-882 — CLI 黄金路径复走（纯文档）

Round 882. 主驱动：doctor / ls --waiting / hooks --install 四态——round-871
后首次，现规模 4,548 会话（迄今最大）。

## 证据

- **doctor**：七行全对（node / claude-code hooks authoritative / codex
  hooks.json authoritative / gemini heuristic / devin API key valid /
  github-pr 与 webhook 诚实"未配置"），~0.16s。
- **ls --waiting**：热跑 9.4s @4,548 会话，22 waiting 全带预览/时长/
  行动链接（session + PR 次级链接），尾行计数（22 waiting · 56 working ·
  4548 total）与 /api/items summary 精确一致。
- **hooks --install 沙箱四态 6/6**：无工具目录诚实 "not found"；全新安装
  双落地带 .attnbox-bak 备份；幂等复跑逐字节不动；坏 JSON 拒绝
  （"could not merge … fix or merge manually"）且原文件逐字节不动、
  exit 1。

## 方法注记

- 坏 JSON 拒绝文案为 "could not merge"（首跑 1 处假 FAIL 为探针文案
  假设，非产品缺陷；与 round-860 注记一致）。

## Verdict

无 P0/P1。沙箱与探针零残留（hook882.tmp.sh 已删）。纯文档轮，无
changeset。
