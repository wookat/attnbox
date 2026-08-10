# GAP-ROUND-486 — CLI 黄金路径复走（纯文档）

Round 486. Driver dimension: CLI golden-path
re-walk (doctor / ls --waiting / hooks --install
four states), first since round-475, at the
largest live scale yet (~3,938 sessions).

## Evidence (v0.4.8, main)

```text
doctor            → 七行全对：node ✓、claude-code
                    authoritative ✓、codex
                    authoritative ✓、gemini
                    heuristic 声明 ✓、devin API ✓、
                    github-pr/webhook 未配置诚实
                    显示 –
ls --waiting      → 热跑 3.4s @3,938 会话，13
                    waiting 全带 detail 预览 +
                    session 行动链接（有 PR 的带
                    PR 次级链接）
hooks --install   → 沙箱四态全通：全新安装（merge
                    + backup）、幂等重跑（already
                    installed）、坏 JSON 拒绝
                    （fix-manually 提示）、原文件
                    未被改动
```

## Verdict

CLI golden paths all healthy at the largest scale
yet. No P0/P1; docs-only, no changeset.
