# GAP-ROUND-838：CLI 黄金路径复走（round-827 后首次）

日期：2026-08-04。主驱动：doctor / ls --waiting / hooks --install 四态实测（rounds 828–837 合并面）。纯文档轮，无 P0/P1。

## doctor

- 七行全对：node ✓、claude-code ✓（authoritative）、codex ✓（authoritative waiting/approve）、gemini ✓（诚实 heuristic 注记）、devin ✓（API 探活 key valid）、github-pr 诚实 fallback inactive、webhook 诚实未配置提示。

## ls --waiting

- 热跑 3.3s @4,483 会话（迄今最大）。
- 12 waiting 全带"在问什么"预览、等待时长、session 主链接 + PR 次级链接。
- 汇总行正确：`12 waiting on you · 41 working · 4483 total`。

## hooks --install 沙箱四态（临时 HOME，零残留）

1. 全新安装：Claude settings.json 合并 + Codex hooks.json/config.toml 双落地，均带 `.attnbox-bak` 备份。✓
2. 幂等重装：三文件 md5 逐字节不动。✓
3. 坏 JSON：拒绝合并（可读报错），原文件逐字节不动；codex 侧诚实 "already installed"。✓
4. 无工具目录：诚实 "not found — is … installed?"。✓

## 结论

- 无产品 P0/P1；沙箱与临时文件全部清理。
- 本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（99 测试）全绿。
