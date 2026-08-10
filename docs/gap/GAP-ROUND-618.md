# GAP-ROUND-618：CLI 黄金路径复走——doctor/ls --waiting/hooks 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径复走（round-607 后首次；真实数据 ~4,200+ 会话——迄今最大）

## 实测结果

- `doctor` 七行全对：node ✓（v22.23.2）、claude-code/codex hooks 权威模式 ✓、gemini 诚实标注（never claims waiting）、devin API ✓、github-pr/webhook 未配置显示中性 `–` 提示。
- `ls --waiting` 热跑 7.1s @~4,200+ 会话：首跑 24 waiting、复核跑 22 waiting（真实数据变动），22/22 全带「在等什么」预览 + 行动链接（session URL，有 PR 的附 PR 次级链接），等待时长排序正常，无变形输出。
- `hooks --install` 沙箱四态全通（`installHooks(home)` 定向沙箱目录）：
  1. 全新安装：claude merge + codex hooks.json/config.toml merge，备份 `*.attnbox-bak`；
  2. 幂等复跑：`already installed`，不重复写；
  3. 已有用户配置：merge 保留用户键（`keepMe`/`keep-me` hook 存留）+ 备份生成；
  4. 坏 JSON：拒绝合并（`!` error + 整改指引）、不动原文件（`{broken` 原样保留）。

## 方法注记

- CLI 无 `--home` 旗标；沙箱四态须直接调用 `dist/hooksInstall.js` 的 `installHooks(home)`，否则命令行跑的是真实 `$HOME`（恒为 already installed），四态覆盖会失真。
- `/usr/bin/time` 本环境不存在；计时用 shell `date +%s.%N` 差值即可，无需安装。

## 清理

沙箱临时目录删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
