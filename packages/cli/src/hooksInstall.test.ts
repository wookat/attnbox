import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { formatInstall, installHooks } from "./hooksInstall.js";

function tempHome(): string {
  return mkdtempSync(join(tmpdir(), "attnbox-hooks-"));
}

describe("installHooks", () => {
  it("skips agents whose dirs do not exist", () => {
    const results = installHooks(tempHome());
    expect(results.map((r) => r.level)).toEqual(["skipped", "skipped"]);
  });

  it("creates fresh configs and is idempotent", () => {
    const home = tempHome();
    mkdirSync(join(home, ".claude"));
    mkdirSync(join(home, ".codex"));

    const first = installHooks(home);
    expect(first.map((r) => r.level)).toEqual(["installed", "installed"]);

    const claude = JSON.parse(readFileSync(join(home, ".claude", "settings.json"), "utf8")) as {
      hooks: Record<string, { hooks: { command: string }[] }[]>;
    };
    for (const event of ["Notification", "Stop", "UserPromptSubmit"]) {
      expect(claude.hooks[event]?.[0]?.hooks[0]?.command).toBe("attnbox hook claude");
    }
    const codexHooks = JSON.parse(readFileSync(join(home, ".codex", "hooks.json"), "utf8")) as {
      hooks: Record<string, unknown>;
    };
    expect(Object.keys(codexHooks.hooks)).toEqual(["PermissionRequest", "Stop", "UserPromptSubmit"]);
    expect(readFileSync(join(home, ".codex", "config.toml"), "utf8")).toContain("codex_hooks = true");

    const second = installHooks(home);
    expect(second.map((r) => r.level)).toEqual(["already", "already"]);
  });

  it("preserves existing user config and backs it up", () => {
    const home = tempHome();
    mkdirSync(join(home, ".claude"));
    mkdirSync(join(home, ".codex"));
    writeFileSync(
      join(home, ".claude", "settings.json"),
      JSON.stringify({ model: "opus", hooks: { Stop: [{ hooks: [{ type: "command", command: "my-own-hook" }] }] } })
    );
    writeFileSync(join(home, ".codex", "config.toml"), 'model = "o4"\n\n[features]\nweb_search = true\n');

    const results = installHooks(home);
    expect(results.map((r) => r.level)).toEqual(["installed", "installed"]);

    const claude = JSON.parse(readFileSync(join(home, ".claude", "settings.json"), "utf8")) as {
      model: string;
      hooks: { Stop: { hooks: { command: string }[] }[] };
    };
    expect(claude.model).toBe("opus");
    expect(claude.hooks.Stop.map((e) => e.hooks[0]?.command)).toEqual(["my-own-hook", "attnbox hook claude"]);
    expect(existsSync(join(home, ".claude", "settings.json.attnbox-bak"))).toBe(true);

    const toml = readFileSync(join(home, ".codex", "config.toml"), "utf8");
    expect(toml).toContain('model = "o4"');
    expect(toml).toContain("web_search = true");
    expect(toml).toMatch(/\[features\]\ncodex_hooks = true/);
    expect(toml.match(/\[features\]/g)?.length).toBe(1);
  });

  it("refuses corrupt configs without destroying them", () => {
    const home = tempHome();
    mkdirSync(join(home, ".claude"));
    writeFileSync(join(home, ".claude", "settings.json"), "{not json");
    const results = installHooks(home);
    expect(results[0]?.level).toBe("error");
    expect(readFileSync(join(home, ".claude", "settings.json"), "utf8")).toBe("{not json");
  });

  it("formats aligned output", () => {
    const out = formatInstall([
      { name: "claude-code", level: "installed", detail: "done" },
      { name: "codex", level: "skipped", detail: "not found" }
    ]);
    expect(out).toContain("✓ claude-code  done");
    expect(out).toContain("– codex        not found");
  });
});
