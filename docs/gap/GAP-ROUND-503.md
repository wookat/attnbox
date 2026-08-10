# GAP-ROUND-503：竞品第四十二批扫描——盯防全查、无新直接对手，无 P0/P1

日期：2026-08-05
驱动维度：竞品调研（round-492 后首次；盯防名单全查 + 新进入者三向搜索）

## 盯防名单动向（GitHub 实查，按活跃度）

```text
claude-dispatcher (Innovology, ★9)  → 仍动作最大：Cockpit v3 re-theme + plan→act→observe→ship
                                       链 + 结构化 dispatch 持续演进；新增 CODE_OF_CONDUCT、
                                       dispatch 信任继承修复（pushed 最新）
gnestor/agent-inbox                 → 活跃：credential proxy/vault 文档化 + googleapis
                                       per-integration 凭证解析修复 + system-docs 门禁——GTD
                                       混排收件箱走凭证代理方向，仍无 agent waiting 语义
kookr (kookr-ai, ★3)                → 高速迭代持续：pipelineStarvation 计数入 status、
                                       cloud-metadata/link-local peer URL SSRF 拒绝
ccmux (epilande, ★120)              → v1.3.0 收尾：tagline/README 刷新，无新功能面
agentfleet (hoaitan, ★4)            → 仅 CI 依赖 bump，功能静默
HumanLoop (Revolper)                → 加 device pairing + Cursor 审批桥 + binding-scoped
                                       alerts——审批象限继续，仍无 waiting/聚合面
trail-boss (jedarden)               → systemd 服务化收尾 + daemon unreachable/queue empty
                                       状态区分，加 license
coslash (centauri-ai, ★3)           → git commit 检测细节修复，常规
duty-on / jind-ai / pulse-protocol / tmux-agentwatch / ryu-approvals → 常规/静默
impri                               → GitHub 无同名仓（此前已迁址 SEO 内容潮），无新动向
```

## 新进入者三向搜索

```text
"attention inbox agents" / "waiting on you agents" / "agent attention unified inbox"
→ 首位命中均为 attnbox；其余命中全为已知盯防仓或不同象限（beknazar/agentfleet 远程机
  fleet 面板、migsilva89/imark Markdown 阅读器等），无新直接对手
```

## 差异化结论

统一本地 CLI + 云端 agent 聚合、显式"在等你什么"waiting 语义 + 行动链接 + 分诊/ack 的组合仍无对手复制；最近的语言重合者（shariqh/agent-inbox、trail-boss、duty-on）均纯本地或无 waiting 语义。差异化不变。

## 结论

无动向级 P0/P1。纯文档轮：不改产品源码、不加 changeset。
