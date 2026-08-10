# GAP-ROUND-516：本地采集器实弹抽查——三采集器状态判定 8/8 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹（round-505 后首次；隔离沙箱 fixture + collectors dist 类直调）

## 证据

```text
PASS claude tool_use → waiting/approve（agent=claude-code）
PASS claude tool_result 解除 waiting（→ working，5 分钟新鲜窗内契约成立）
PASS codex 审批 → waiting/approve（detail 带命令预览 "wants to run: rm -rf dist"）
PASS codex task_complete + stale mtime → idle
PASS gemini fresh mtime → working
PASS gemini never waiting（fresh）
PASS gemini stale mtime → idle
PASS gemini never waiting（stale）
```

- 方法注记复核成立（rounds 428/483）：Claude agent 名 `claude-code`、Codex fixture 须 `sessions/YYYY/MM/DD/` + `session_meta`、采集器构造为目录路径位置参数。
- 新方法注记：`GeminiCollector` 构造参数是 `~/.gemini` 根目录（内部自拼 `tmp/`）非 tmp 目录本身——首跑传 `<root>/gemini/tmp` 导致 4 项假 FAIL，改传 `<root>/gemini` 后全通，非产品缺陷。
- 清理：沙箱 rmSync 删净、探针脚本删除，零残留。

## 结论

- 三采集器实弹 8/8 全对，源状态语义（Claude 审批往返、Codex 命令预览、Gemini 诚实边界）契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
