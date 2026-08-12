# GAP-ROUND-867 — 分诊全流程 UX 走查（纯文档）

Round 867. 主驱动：分诊全流程走查（round-856 后首次），@4,519 会话
（迄今最大）。

## 证据（契约 9/9 全部成立）

- 默认态 64 卡、0 次全量 fetch（slim SSE 契约成立）。
- Needs you 过滤 17 卡与 API summary.waiting=17 精确一致。
- 惰性搜索恰好 1 次全量 fetch、1 命中与全量数据集期望精确一致
  （含中文词条搜索）；负例诚实空态 0 卡。
- j/e 键盘 ack 台账 13→14；API 反 ack（{id, at:null}）后台账与基线
  逐字节还原。
- ✓ all done 一键 13→27（14 waiting 全 ack）；逐项反 ack 后 1s 内
  台账逐字节还原（隔离复测确认）。
- ? 快捷键帮助面板正常弹出。
- 0 pageerror、0 console error。

## 方法注记

- 搜索框清空后焦点仍在 input，j/e 快捷键会被输入框吞掉——键盘链探针
  须先 Escape + 点击空白处移焦（首跑 2 处假 FAIL 为此探针问题）。
- ack-all 反 ack 还原为异步落盘，固定 3.5s 等待对 16 项不稳——改用
  轮询到 byte-identical（首跑 1 处假 FAIL 为探针竞态）。均非产品缺陷。

## Verdict

无 P0/P1，分诊全流程契约在 4,519 会话规模全部成立。台账逐字节还原、
探针零残留。纯文档轮，无 changeset。
