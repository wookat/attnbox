# GAP-ROUND-607：CLI 黄金路径复走——doctor/ls --waiting/hooks 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径复走（round-596 后首次；真实数据 ~4,154 会话——迄今最大）

## 实测结果

- `doctor` 七行全对：node ✓、claude-code/codex hooks 权威模式 ✓、gemini 诚实标注（never claims waiting）、devin API ✓、github-pr/webhook 未配置显示中性 `–` 提示。
- `ls --waiting` 热跑 4.7s @~4,154 会话：17 waiting 全带「在等什么」预览 + 行动链接（session URL，有 PR 的附 PR 次级链接），等待时长排序正常。
- `hooks --install` 沙箱四态全通：
  1. 全新安装：merge + 备份 `*.attnbox-bak`；
  2. 幂等复跑：`already installed`，不重复写；
  3. 已有用户配置：merge 保留用户键（`keep-me` 存留）；
  4. 坏 JSON：拒绝合并、不动原文件（`{broken` 原样保留），给出整改指引。

## 清理

沙箱临时目录删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
