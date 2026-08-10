# GAP-ROUND-497：CLI 黄金路径复走——doctor/ls --waiting/hooks --install 四态全通，无 P0/P1

日期：2026-08-05
驱动维度：CLI 黄金路径（round-486 后首次；doctor / ls --waiting / hooks --install 四态沙箱）

## 探针与证据

### doctor（真机七行全对）

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
✓ codex        sessions found, hooks.json installed (authoritative waiting/approve)
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive
– webhook      ATTNBOX_WEBHOOK_URL not set — no push channel while the inbox is closed
```

### ls --waiting（真实 dogfood 数据）

```text
6 waiting on you · 42 working · 3951 total（迄今最大）
热跑 2.5s；6/6 waiting 全带"在等什么"预览 + session 主链接（含 PR 次级链接）+ 等待时长
```

### hooks --install 沙箱四态（临时 HOME + .claude/.codex 目录）

```text
fresh install    → claude 合并入 settings.json + backup；codex hooks.json 合并 + codex_hooks=true + backups
idempotent rerun → 双双 already installed
malformed JSON   → claude 拒绝合并并给出人工指引；codex 不受影响
preservation     → 坏 JSON 原文件逐字节 unchanged（diff -q 通过）
```

- 清理：沙箱 HOME 与临时对照文件已删，零残留。

## 结论

- CLI 黄金路径契约全部成立，rounds 487–496 合并面无 CLI 回归。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
