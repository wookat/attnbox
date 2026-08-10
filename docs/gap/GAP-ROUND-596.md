# GAP-ROUND-596：CLI 黄金路径复走——doctor/ls/hooks 四态全通，无 P0/P1

日期：2026-08-10
驱动维度：CLI 黄金路径（round-585 后首次；真实数据 4,131 会话——迄今最大）

## 实测结果

### doctor（七行全对）

node / claude-code（hooks authoritative）/ codex（hooks.json authoritative）/ gemini（heuristic 诚实标注）/ devin（API+key 有效）五个 ✓，github-pr 与 webhook 未配置各一条诚实 `–` 提示，exit 0。

### ls --waiting

- 热跑 4.3s @4,131 会话（迄今最大），18 waiting 全带「在等什么」预览 + 行动链接（session URL + PR 次级链接）+ 等待时长。
- 尾部汇总行正确：`18 waiting on you · 54 working · 4131 total`。

### hooks --install 沙箱四态

1. 全新安装：claude settings.json + codex hooks.json 合并，均留 `.attnbox-bak` 备份。
2. 幂等重跑：双双 `already installed`，无重复写入。
3. 既有配置合并：`env.FOO` 保留 + hooks 注入成功。
4. 坏 JSON 拒绝：报错 exit 1，原文件原样不动。

## 清理

沙箱目录删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
