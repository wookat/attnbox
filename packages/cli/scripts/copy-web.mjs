// Bundle the built web UI into the published `attnbox` package as `web-dist/`.
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "..", "..", "..", "apps", "web", "dist");
const target = join(here, "..", "web-dist");

if (!existsSync(join(source, "index.html"))) {
  console.error("copy-web: apps/web/dist not built; run `pnpm --filter @attnbox/web build` first");
  process.exit(1);
}
rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log(`copy-web: bundled web UI into ${target}`);
