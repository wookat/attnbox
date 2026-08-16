# GAP-ROUND-981：CLI 黄金路径复走（round-970 后首次）

日期：2026-08-04。基线 main：#1015（`8d43dc6`）。live daemon @5,370 会话（迄今最大）。

## 检查结果

### doctor（~0.15s，七行全对）
- node ✓ / claude-code hooks 权威 ✓ / codex hooks.json 权威 ✓ / gemini 启发式（从不声称 waiting）✓ / devin API key 有效 ✓ / github-pr 诚实未激活 – / webhook 诚实未配置 –。

### ls --waiting（热跑 ~6.7s @5,370）
- 首跑尾行 29 waiting · 78 working vs API 同刻 30/77：live 转换观察竞态（rounds 926/937/970 同类非缺陷）。
- 受控复测（ls 与 API 同刻并发采样）：`30 waiting on you · 77 working · 5370 total` 与 API summary 精确一致。
- 30 项 waiting 全带预览（detail 摘要）、等待时长、行动链接（session URL + PR 次级链接）。

### hooks --install 沙箱四态（6/6 首跑全通）
1. 无工具目录：诚实 "not found"，exit 0。
2. 全新落地：claude settings.json 合并 + codex hooks.json 合并 + codex_hooks=true，均带 `.attnbox-bak` 备份。
3. 幂等：二次运行 "already installed"，两文件 md5 逐字节不动。
4. 坏 JSON：拒绝合并，exit 1，原文件逐字节不动；codex 面不受影响。

## 结论

- 无 P0/P1；沙箱与临时文件零残留。
- 本地门禁全绿（lint ✓ / typecheck ✓ / build ✓ / test 99 ✓）；GitHub Actions 按公司政策保持禁用，以本地门禁为验收标准。
