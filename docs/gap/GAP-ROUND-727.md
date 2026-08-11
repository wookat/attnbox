# GAP-ROUND-727：dogfood 数据健康度复查——4,351 会话全干净（1 例瞬时 unknown 已核实自愈）

日期：2026-08-04
驱动维度：dogfood 数据健康度（round-716 后首次；waiting/ack 数据健康度 + waiting 时长分布）

## 证据（@4,351 会话，迄今最大）

- 0 重复 ID、0 坏时间戳；waiting 10/10 全带 detail+url+attention。
- waiting 时长中位 11.7 分钟、max 3,740.0 分钟（真实长挂会话忠实透传）。
- ack 台账 13 条零孤儿；daemon 日志零错误；探针零残留（daemon 已停核验）。
- 连续第五十三个干净数据轮（含下述瞬时项核实后）。

## 观察项（非缺陷）

- 首采样出现 1 例 `unknown` 状态（devin 会话，正在运行的活跃会话）。直查 Devin 单会话 API 得 `status_enum: "working"`；下一采集周期该会话已正常显示 `working`，unknown 归零。判定为列表 API 抓取窗口内的瞬时枚举缺失（会话状态切换瞬间），`mapStatus` 诚实回落 `unknown` 属预期行为，自愈无需修复。若未来出现持续（跨多周期）unknown 才升级排查。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
