import { describe, expect, it } from "vitest";
import { GithubReviewCollector } from "./github.js";

function fakeFetch(body: unknown, ok = true): typeof fetch {
  return (async () =>
    ({
      ok,
      json: async () => body
    }) as Response) as typeof fetch;
}

describe("GithubReviewCollector", () => {
  it("maps review-requested PRs to waiting/review", async () => {
    const collector = new GithubReviewCollector(
      "token",
      "https://api.github.com",
      fakeFetch({
        items: [
          {
            number: 7,
            title: "Add dark mode",
            html_url: "https://github.com/o/r/pull/7",
            updated_at: "2026-08-04T00:00:00Z",
            repository_url: "https://api.github.com/repos/o/r"
          }
        ]
      })
    );
    const items = await collector.collect();
    expect(items[0]).toMatchObject({
      id: "github-pr:o/r#7",
      agent: "github-pr",
      location: "cloud",
      status: "waiting",
      attention: "review",
      confidence: "authoritative",
      project: "o/r",
      url: "https://github.com/o/r/pull/7"
    });
  });

  it("returns empty on HTTP errors and network failures", async () => {
    expect(await new GithubReviewCollector("t", "u", fakeFetch({}, false)).collect()).toEqual([]);
    const throwing = (async () => {
      throw new Error("network");
    }) as unknown as typeof fetch;
    expect(await new GithubReviewCollector("t", "u", throwing).collect()).toEqual([]);
  });
});
