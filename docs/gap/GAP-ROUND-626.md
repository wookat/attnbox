# GAP-ROUND-626：本地采集器实弹抽查——三采集器状态判定 13/13 全对，无 P0/P1

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-615 后首次；隔离 fixture 目录直构 collector 实例，dist 直调）

## 实测结果（13/13）

### Claude（6/6）

- assistant 尾部含未解决 `tool_use` → waiting + attention=approve，detail 取 assistant text（"Running pnpm test now"）；
- 匹配 `tool_result` 到达 → 解除 waiting；
- assistant 纯文本收尾 → idle；user 消息收尾 → working。

### Codex（4/4）

- `exec_approval_request` → waiting/approve，命令数组转预览（"wants to run: rm -rf node_modules"）；
- `task_complete` → idle；仅 `task_started` → working。

### Gemini（3/3）

- 新 mtime → working；3 小时陈旧 mtime → idle；全程从不声称 waiting。

## 方法注记（新增）

- `AttentionItem.attention` 是纯字符串（`AttentionKind`），不是 `{kind}` 对象——探针断言写 `item.attention === "approve"`，勿解构 `.kind`（本轮 2 处首跑假 FAIL 即此因，修正断言后全绿，非产品缺陷）。

## 清理

fixture 目录（/tmp/r626）与探针脚本删除，未触碰真实 ~/.claude、~/.codex、~/.gemini，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
