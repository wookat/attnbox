import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { formatDoctor, runDoctor } from "./doctor.js";

function tempHome(): string {
  return mkdtempSync(join(tmpdir(), "attnbox-doctor-"));
}

function okFetch(ok = true, status = 200): typeof fetch {
  return (async () => ({ ok, status }) as Response) as typeof fetch;
}

describe("runDoctor", () => {
  it("reports collectors as off in an empty home", async () => {
    const checks = await runDoctor({ home: tempHome(), env: {}, fetchImpl: okFetch() });
    const byName = Object.fromEntries(checks.map((c) => [c.name, c]));
    expect(byName["claude-code"]?.level).toBe("off");
    expect(byName["codex"]?.level).toBe("off");
    expect(byName["gemini"]?.level).toBe("off");
    expect(byName["devin"]?.level).toBe("off");
    expect(byName["github-pr"]?.level).toBe("off");
    expect(byName["node"]?.level).toBe("ok");
  });

  it("warns when sessions exist but hooks are not installed", async () => {
    const home = tempHome();
    mkdirSync(join(home, ".claude", "projects"), { recursive: true });
    mkdirSync(join(home, ".codex", "sessions"), { recursive: true });
    const checks = await runDoctor({ home, env: {}, fetchImpl: okFetch() });
    const byName = Object.fromEntries(checks.map((c) => [c.name, c]));
    expect(byName["claude-code"]?.level).toBe("warn");
    expect(byName["codex"]?.level).toBe("warn");
    expect(byName["codex"]?.detail).toContain("attnbox hooks");
  });

  it("reports authoritative setups as ok", async () => {
    const home = tempHome();
    mkdirSync(join(home, ".claude", "projects"), { recursive: true });
    writeFileSync(join(home, ".claude", "settings.json"), JSON.stringify({ hooks: { Stop: [{ hooks: [{ command: "attnbox hook claude" }] }] } }));
    mkdirSync(join(home, ".codex", "sessions"), { recursive: true });
    writeFileSync(join(home, ".codex", "hooks.json"), JSON.stringify({ hooks: { Stop: [{ hooks: [{ command: "attnbox hook codex" }] }] } }));
    const checks = await runDoctor({ home, env: {}, fetchImpl: okFetch() });
    const byName = Object.fromEntries(checks.map((c) => [c.name, c]));
    expect(byName["claude-code"]?.level).toBe("ok");
    expect(byName["codex"]?.level).toBe("ok");
  });

  it("validates the Devin key against the live API", async () => {
    const home = tempHome();
    const env = { DEVIN_API_KEY: "k" };
    const good = await runDoctor({ home, env, fetchImpl: okFetch() });
    expect(good.find((c) => c.name === "devin")).toMatchObject({ level: "ok", detail: "API reachable, key valid" });
    const bad = await runDoctor({ home, env, fetchImpl: okFetch(false, 401) });
    expect(bad.find((c) => c.name === "devin")?.level).toBe("warn");
    const down = await runDoctor({
      home,
      env,
      fetchImpl: (async () => {
        throw new Error("network");
      }) as unknown as typeof fetch
    });
    expect(down.find((c) => c.name === "devin")?.level).toBe("warn");
  });

  it("validates the GitHub token against the live API", async () => {
    const home = tempHome();
    const env = { GITHUB_TOKEN: "t" };
    const good = await runDoctor({ home, env, fetchImpl: okFetch() });
    expect(good.find((c) => c.name === "github-pr")).toMatchObject({ level: "ok" });
    const bad = await runDoctor({ home, env, fetchImpl: okFetch(false, 401) });
    expect(bad.find((c) => c.name === "github-pr")).toMatchObject({ level: "warn" });
    expect(bad.find((c) => c.name === "github-pr")?.detail).toContain("401");
    const down = await runDoctor({
      home,
      env,
      fetchImpl: (async () => {
        throw new Error("network");
      }) as unknown as typeof fetch
    });
    expect(down.find((c) => c.name === "github-pr")?.level).toBe("warn");
  });

  it("reports the webhook channel", async () => {
    const home = tempHome();
    const off = await runDoctor({ home, env: {}, fetchImpl: okFetch() });
    expect(off.find((c) => c.name === "webhook")?.level).toBe("off");
    const on = await runDoctor({ home, env: { ATTNBOX_WEBHOOK_URL: "https://ntfy.sh/topic?tpl=yes&title=t" }, fetchImpl: okFetch() });
    expect(on.find((c) => c.name === "webhook")).toMatchObject({ level: "ok", detail: "newly-waiting items POST to https://ntfy.sh/topic" });
    const bad = await runDoctor({ home, env: { ATTNBOX_WEBHOOK_URL: "not a url" }, fetchImpl: okFetch() });
    expect(bad.find((c) => c.name === "webhook")?.level).toBe("warn");
  });

  it("formats aligned readable output", async () => {
    const out = formatDoctor(await runDoctor({ home: tempHome(), env: {}, fetchImpl: okFetch() }));
    expect(out).toContain("– claude-code");
    expect(out.split("\n").length).toBe(7);
  });
});
