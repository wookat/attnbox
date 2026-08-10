# GAP-ROUND-588：--host token 门禁 + waiting webhook 复测——契约全部成立，无 P0/P1

日期：2026-08-10
驱动维度：安全面 + webhook 通道（round-577 后首次；真实数据 ~4,108 会话）

## token 门禁（九面全对）

0. `--host 0.0.0.0` 无 token → 拒绝启动（refusing to bind，提示设置 ATTNBOX_TOKEN）。
1. loopback 无 token → 401（token 配置时 loopback 同样强制，与 round-577 契约一致）。
2. 非环回地址（172.16.3.2）无 token → 401。
3. 错误 Bearer → 401。
4. 正确 Bearer → 200。
5. 错误 query token → 401。
6. 正确 query token → 200。
7. SSE 无 token → 401。
8. SSE 正确 token → 200。
9. 静态资源无 token → 200（仅 `/api/*` 受保护，符合设计）。

## waiting webhook

- 对 15 条存量 waiting 启动 → 启动窗零误 POST（storm guard 契约成立）。
- ~7.5 分钟观察：2 POST 2 唯一 ID，均为窗口内真实新转换，零重复。
- daemon 日志 error 计数 0。

## 探针方法注记

- 后台 setsid 启动必须用 CLI 绝对路径：相对路径 `packages/cli/dist/index.js` 在剥离 cwd 的子 shell 中会 MODULE_NOT_FOUND（本轮首跑即中招，非产品缺陷）。

## 清理

daemon/sink 杀净（双端口连接拒绝复测 000）、日志/环境文件删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
