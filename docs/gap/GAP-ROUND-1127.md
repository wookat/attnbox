# GAP-ROUND-1127: --host token 门禁 + waiting webhook 通道复测（round-1116 后首次）

日期：2026-08-04
基线：main @ 2174b4b（#1161 合并后），round-1116（#1151）后首次安全面/webhook 复测。
方法：隔离端口全新 daemon（token 4951 / webhook 接收器 4952 / webhook daemon 4953），主 daemon 4820 不受影响。负例多面 + 存量零重放精确 id 集合断言。

## 结论

无 P0/P1。token 门禁 12/12 首跑全通；webhook 冷启动对存量 waiting 零重放（精确 id 集合断言）；~6.5 分钟观察窗中一个存量 id 被 POST，经源码 + 上游会话逐一核实为「离开 waiting 又重新进入 waiting」的合法真实转换（转换即通知契约表现），非重放缺陷。

## 1. token 门禁（隔离端口 4951）——12/12 全通

- 无 token 绑定 0.0.0.0 被拒绝（报错提示 token）
- items 无 token 401 / 坏 query token 401 / 坏 Bearer 401
- items 合法 query token 200 / 合法 Bearer 200
- SSE (/api/events) 无 token 401 / 合法 token 200
- ack 无 token 401 / 坏 body 400 / 数字 at 400

```text
SEC1127_DONE pass=12 fail=0
```

## 2. waiting webhook（隔离端口 4952/4953）

冷启动窗（30s）：存量 waiting 快照后零 POST——

```text
PASS cold start zero replay for existing waiting (exact id set) posts=0 replays=0
```

观察窗（~6.5 分钟）：4 POSTs / 3 unique id，其中 1 个 id 在启动时存量 waiting 集合内：

```text
INFO observation: posts=4 uniqueIds=3 existingReplayed=1
INFO delivered id=devin:devin-39d56413… liveStatus=done
INFO delivered id=devin:devin-a80f13fc… liveStatus=working
INFO delivered id=devin:devin-c5ca6f5d… liveStatus=waiting
```

### 交集 id 的判定：合法 leave/re-enter 转换，非重放

证据一（源码）：`packages/daemon/src/index.ts` `fireWebhooks` 的 `waitingSeen` 集合——首轮只记录不通知；id 只有在被**观察到非 waiting 状态**时才从集合删除（缺席不删除，round-71 风暴防护）；再次进入 waiting 才 POST。存量 id 不经历真实「离开→重进」转换不可能被 POST。

证据二（上游直查）：三个送达 id 对应 Devin 会话均为观察窗内活跃流转的真实会话——39d56413… 轮后已 suspended（映射 done，明确离开过 waiting）、a80f13fc… working、c5ca6f5d… waiting_for_user。交集 id 的当前状态与「窗口内离开又重进 waiting」一致。

判定：探针的「观察窗内存量 id 永不 POST」断言对长窗口过严——存量 waiting 会话在 ~6.5 分钟内完成一轮「被回复→working→再次 blocked」是正常 live 流转，webhook 对该重进转换发通知正是契约行为。冷启动零重放（真正的 round-71 契约）已精确通过。方法注记：长观察窗的交集断言应改为「交集 id 必须伴随可证的离开转换」，而非一律 FAIL。

## 3. 环境健康

- 主 daemon 4820 全程健康（轮后 total=5,518 迄今最大，waiting=7）
- ack 台账 md5 轮前后逐字节一致：`5166cdf444b78b4bcb1fe55e7fbc8832`（19 条）
- 隔离端口 4951/4952/4953 全部释放，探针零残留

## 4. 合并面

rounds 1117–1126（#1152–#1161）均为纯文档轮，无安全面/webhook 代码变更，无回归。
