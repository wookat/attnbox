# GAP-ROUND-577：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-566 后首次；临时 daemon @ 0.0.0.0:4577 经 172.16.3.2 实测，真实数据 4,087 会话——迄今最大）

## 证据

### token 门禁（八面全对）

```text
无 token / 坏 bearer / 坏 query token / SSE 无 token / ack 无 token → 全部 401
正确 bearer / 正确 query token → 200
loopback：token 设置时同样强制（127.0.0.1 无 token 401、带 token 200）——与 --host 契约一致
```

### waiting webhook（~7.5 分钟窗口）

```text
存量 14 waiting 启动零误 POST
窗口内 9 POST / 7 唯一 ID；2 个 ID 为 vendor 真实抖动（离开 waiting 后再转换）按守卫契约重发，waiting 期内零重复
payload 契约成立：{"event":"waiting","item":{...status:"waiting"}}
daemon 日志错误：0
```

- 清理：daemon/hook 杀净（连接拒绝复测）、脚本/日志删除，零残留。

## 结论

- 安全面与 webhook 通道契约在迄今最大规模下全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
