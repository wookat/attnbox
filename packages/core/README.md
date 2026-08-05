# attnbox-core

Shared types and helpers for [attnbox](https://www.npmjs.com/package/attnbox), the unified attention inbox for AI coding agents.

Exports the `AttentionItem` model (agent, location, status, attention kind, `authoritative` vs `heuristic` confidence), the `Collector` interface, and sorting/summarizing helpers used by the daemon and CLI.

```ts
import type { AttentionItem, Collector } from "attnbox-core";
```

Most users want the CLI instead: `npx attnbox`. Docs: https://attnbox.zalize.com
