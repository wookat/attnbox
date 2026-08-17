# GAP-ROUND-1006: --host token 门禁 + waiting webhook 复测（round-995 后首次）

日期：2026-08-17。主驱动：--host token 门禁负例多面 + ack/un-ack 台账往返 + waiting webhook 冷启动零重放（同 round-995 法）。结论先行：**门禁 10/10 首跑全通 + 台账逐字节还原 + 冷启动零重放，无 P0/P1**。

## 结果

1. token 门禁 10/10 首跑全通：无 token 拒绝绑定 0.0.0.0（报错提及 token）；items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 at 400（隔离端口 4906）。
2. 真实 ID ack/un-ack 往返：台账 11→12→11，前后 md5 逐字节一致（a3a67093…），零孤儿。
3. webhook 冷启动 id 集合比对：对存量 17 waiting 零重放；~6.5 分钟观察窗 3 POSTs / 3 unique 均为真实新转换（NEW，非 PRE），无风暴形态；隔离 daemon（端口 4907）日志 0 error。
4. live 面 @5,414 会话（迄今最大），探针零残留（sec/sink 探针与临时文件已删）。

## 结论

rounds 996–1005 合并面无安全面/webhook 回归。无 P0/P1；本轮纯文档。继续循环。
