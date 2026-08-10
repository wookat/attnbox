# GAP-ROUND-629：CLI 黄金路径复走——doctor/ls/hooks 四态全通，无 P0/P1

日期：2026-08-04
驱动维度：CLI 黄金路径复走（round-618 后首次；dist 直跑 + installHooks(home) 沙箱直调）

## 实测结果

- `doctor`：七行全对（node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式 ✓、devin key 有效 ✓、github-pr 未配置 `–` 中性显示、webhook 未配置 `–`）。
- `ls --waiting`：热跑 6.2s @ 4,230+ 会话（迄今最大规模量级），22 waiting 全部 22/22 带 detail 预览 + 22/22 带 session/PR 行动链接。
- `hooks --install` 沙箱四态 10/10 全通：
  - 无 agent 目录 → 双 skipped；
  - 全新安装 → 双 installed（claude settings.json、codex hooks.json + `codex_hooks = true`）；
  - 二次运行 → 双 already（幂等零改写）；
  - 已有用户配置 → 合并保留用户键 + `.attnbox-bak` 备份；
  - 坏 JSON → error 拒绝、原文件原样不动、不写备份。

## 方法注记

- `installHooks(home)` 返回 `InstallResult { name, level, detail }`，level ∈ installed/already/skipped/error——探针断言用 `r.level`，勿用 `r.target`/`r.action`（本轮首跑假 FAIL 即此因，非产品缺陷）。

## 清理

探针脚本与沙箱目录全部删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
