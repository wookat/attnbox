# GAP-ROUND-547：第四十六批竞品扫描——Claude Code 官方 agent view 入档，赛道语言持续收敛

日期：2026-08-10
驱动维度：竞品调研（round-536 后首次；盯防名单全查 + 新进入者扫描）

## 盯防名单动向

- **Claude Code agent view（官方，重点新入档）**：Anthropic 正式推出 `claude agents`（Research Preview）——单屏管理全部后台 Claude Code 会话，行级显示 working/needs-your-input/done、行内回答决策、`/bg`、`claude --bg`。这是迄今最重量级的"注意力面"动作，但象限仍不同：仅 Claude Code 本地 CLI 会话、无跨 vendor（Codex/Devin/Gemini）、无云端聚合、无移动端/PWA、无 ack 分诊台账。对 attnbox 的含义：单 vendor 本地面的"who needs you"正在被 vendor 一方收编，跨 vendor + 云端 + 移动分诊是必须坚持的差异化。
- **claude-dispatcher / claude-cockpit → squadrant**：claude-cockpit 已改名 squadrant（0.9.0），转向多 agent 编排层（dispatcher + 跨 agent projection），编排方向正交于收件箱。
- **kookr**：恢复高速迭代（per-project 通知静音 #1004、hook replay 场景目录 #1122），仍为本地 dashboard 象限，无云端聚合。
- **agentfleet（chankov/agent-fleet）**：Hermes Desktop 面板文案出现 "who is waiting on you"，语言重合加深；仍是编排/fleet 控制面，非统一收件箱。
- **ccmux（skzv）**：v0.1.1 上 Homebrew，dashboard/更新面持续打磨；epilande/ccmux（tmux 跳转）116 星平稳。
- **gnestor/agent-inbox、waiting-on、trail-boss、jind-ai、claude-notify、herdr 系**：无象限变化。

## 新进入者（本轮入档观察）

- **Acepe（flazouh/acepe）**：桌面 ADE，自带 "attention queue"（answer-needed 置顶排序）——语言最接近的桌面新入者；本地桌面 app、ACP 协议、无云端 agent、无移动端。
- **Agent Notifier（notifier.aicrew.in）**：iPhone 推送通道（锁屏 approve/deny），推送外设象限，非收件箱。
- **Irrlicht（irrlicht.io）**：macOS 菜单栏 telemetry（working/waiting/ready 圆点），本地菜单栏象限。
- **Codeman（getcodeman.com）**：tmux 常驻多 agent 控制台 + 手机访问，与 ccmux.ai 同象限。

## 三向搜索验证

- "agent attention inbox waiting on you coding agents dashboard" 首位命中仍为 **wookat/attnbox**（其后为 Claude 官方 agent view、Acepe）。

## 结论

- 无 P0/P1。差异化（本地+云端统一、诚实状态语义、移动 PWA、ack 分诊、webhook）不变，但官方 agent view 与 Acepe attention queue 表明"注意力"语言已成赛道共识——盯防名单新增 Claude agent view 与 Acepe。纯文档轮：不改产品源码、不加 changeset。
