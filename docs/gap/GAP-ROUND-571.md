# GAP-ROUND-571：本地采集器实弹抽查——三采集器状态判定 10/10 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹抽查（round-560 后首次；受控 fixture 直接驱动 dist 构建的 Claude/Codex/Gemini 采集器）

## 证据（10/10 首跑全对）

### Claude（projects 目录构造，round-538 方法注记套用）

```text
未解决 tool_use => waiting ✓  attention=approve ✓  detail 取最后 assistant text ✓
匹配 tool_result 解除 waiting（转 working）✓
```

### Codex（sessions/YYYY/MM/DD + session_meta，round-549 命令契约=字符串数组）

```text
exec_approval_request => waiting/approve ✓  detail "wants to run: npm install leftpad" ✓
task_complete 清除 pendingApproval（转 idle）✓
```

### Gemini（根目录构造，collector 自行追加 tmp/，round-516 方法注记套用）

```text
新鲜 mtime => working ✓  从不声称 waiting ✓
```

- 清理：fixture 临时目录与探针脚本删除，零残留。

## 结论

- 三采集器实弹 10/10 全对；既有方法注记（构造参数形状、fixture 布局、命令契约）全部套用零假 FAIL。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
