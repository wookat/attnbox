import type { AttentionItem, Collector } from "attnbox-core";

/**
 * Fallback collector for cloud coding agents without an accessible API
 * (GitHub Copilot coding agent, Cursor Cloud Agents, teammates' bots):
 * any open PR where your review is requested surfaces as waiting/review.
 *
 * Uses `GET /search/issues?q=is:pr is:open review-requested:@me` and is
 * enabled only when a `GITHUB_TOKEN`/`ATTNBOX_GITHUB_TOKEN` is configured.
 */
export class GithubReviewCollector implements Collector {
  readonly name = "github-pr";

  constructor(
    private readonly token: string,
    private readonly baseUrl: string = "https://api.github.com",
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  async collect(): Promise<AttentionItem[]> {
    const query = encodeURIComponent("is:pr is:open review-requested:@me");
    let response: Response;
    try {
      response = await this.fetchImpl(`${this.baseUrl}/search/issues?q=${query}&per_page=50`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/vnd.github+json"
        }
      });
    } catch {
      return [];
    }
    if (!response.ok) return [];
    const body = (await response.json()) as { items?: SearchItem[] };
    return (body.items ?? []).map((pr) => toItem(pr));
  }
}

interface SearchItem {
  number: number;
  title: string;
  html_url: string;
  updated_at?: string;
  repository_url?: string;
}

function toItem(pr: SearchItem): AttentionItem {
  const repo = pr.repository_url?.replace(/^.*\/repos\//, "");
  return {
    id: `github-pr:${repo ?? "unknown"}#${pr.number}`,
    agent: "github-pr",
    location: "cloud",
    status: "waiting",
    attention: "review",
    confidence: "authoritative",
    title: pr.title,
    url: pr.html_url,
    ...(repo ? { project: repo } : {}),
    ...(pr.updated_at ? { lastActivityAt: pr.updated_at } : {})
  };
}
