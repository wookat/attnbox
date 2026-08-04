import { useEffect, useMemo, useRef, useState } from "react";
import type { AttentionItem, InboxSummary } from "attnbox-core";

interface Payload {
  items: AttentionItem[];
  summary: InboxSummary;
}

type Filter = "all" | "waiting" | "working" | "done";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "waiting", label: "Needs you" },
  { key: "working", label: "Working" },
  { key: "done", label: "Done" }
];

const STATUS_STYLE: Record<AttentionItem["status"], { dot: string; label: string }> = {
  waiting: { dot: "bg-amber-400 animate-pulse", label: "text-amber-300" },
  working: { dot: "bg-emerald-400", label: "text-emerald-300" },
  idle: { dot: "bg-zinc-500", label: "text-zinc-400" },
  done: { dot: "bg-sky-500", label: "text-sky-400" },
  unknown: { dot: "bg-zinc-700", label: "text-zinc-500" }
};

const AGENT_STYLE: Record<string, string> = {
  "claude-code": "bg-orange-500/15 text-orange-300 border-orange-500/20",
  codex: "bg-teal-500/15 text-teal-300 border-teal-500/20",
  gemini: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  devin: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "github-pr": "bg-zinc-500/15 text-zinc-300 border-zinc-500/20"
};

const ATTENTION_LABEL: Record<NonNullable<AttentionItem["attention"]>, string> = {
  approve: "needs approval",
  answer: "has a question",
  review: "review requested",
  unblock: "blocked on you"
};

function timeAgo(iso?: string): string {
  if (!iso) return "";
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${Math.floor(s)}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function matches(item: AttentionItem, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "done") return item.status === "done" || item.status === "idle";
  return item.status === filter;
}

function notificationsSupported(): boolean {
  return typeof Notification !== "undefined";
}

export default function App() {
  const [data, setData] = useState<Payload>({ items: [], summary: { total: 0, waiting: 0, working: 0 } });
  const [connected, setConnected] = useState(false);
  const [filter, setFilter] = useState<Filter>(() => {
    const saved = localStorage.getItem("attnbox:filter");
    return FILTERS.some((f) => f.key === saved) ? (saved as Filter) : "all";
  });
  const [notify, setNotify] = useState(
    () => notificationsSupported() && Notification.permission === "granted" && localStorage.getItem("attnbox:notify") !== "off"
  );
  const seenWaiting = useRef<Set<string> | null>(null);

  useEffect(() => {
    const waitingIds = new Set(data.items.filter((i) => i.status === "waiting").map((i) => i.id));
    const prev = seenWaiting.current;
    seenWaiting.current = waitingIds;
    if (!prev || !notify || Notification.permission !== "granted") return;
    for (const item of data.items) {
      if (item.status !== "waiting" || prev.has(item.id)) continue;
      const label = item.attention ? ATTENTION_LABEL[item.attention] : "needs you";
      const n = new Notification(`${item.agent}: ${label}`, { body: item.title, icon: "/icon-192.png", tag: item.id });
      if (item.url) n.onclick = () => window.open(item.url, "_blank");
    }
  }, [data.items, notify]);

  async function toggleNotify(): Promise<void> {
    if (!notificationsSupported()) return;
    if (notify) {
      localStorage.setItem("attnbox:notify", "off");
      setNotify(false);
      return;
    }
    const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem("attnbox:notify", "on");
      setNotify(true);
    }
  }

  useEffect(() => {
    localStorage.setItem("attnbox:filter", filter);
  }, [filter]);

  useEffect(() => {
    document.title = data.summary.waiting > 0 ? `(${data.summary.waiting}) attnbox` : "attnbox — agent attention inbox";
  }, [data.summary.waiting]);

  useEffect(() => {
    const source = new EventSource("/api/events");
    source.onopen = () => setConnected(true);
    source.onerror = () => setConnected(false);
    source.onmessage = (e) => setData(JSON.parse(e.data as string) as Payload);
    return () => source.close();
  }, []);

  const visible = useMemo(() => data.items.filter((i) => matches(i, filter)), [data.items, filter]);
  const waiting = visible.filter((i) => i.status === "waiting");
  const rest = visible.filter((i) => i.status !== "waiting");

  return (
    <div className="min-h-dvh pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-bold text-zinc-950">
              @
            </span>
            <div>
              <h1 className="text-base font-semibold leading-tight tracking-tight">attnbox</h1>
              <p className="text-[11px] leading-tight text-zinc-500">agent attention inbox</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {notificationsSupported() && (
              <button
                onClick={() => void toggleNotify()}
                title={notify ? "Notifications on — click to mute" : "Notify me when an agent needs me"}
                aria-pressed={notify}
                className={`grid size-8 place-items-center rounded-full border text-sm transition-colors ${
                  notify
                    ? "border-amber-700 bg-amber-500/10 text-amber-300"
                    : "border-zinc-700 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {notify ? "🔔" : "🔕"}
              </button>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
                connected ? "border-emerald-800 text-emerald-300" : "border-zinc-700 text-zinc-500"
              }`}
            >
              <span className={`size-1.5 rounded-full ${connected ? "bg-emerald-400" : "bg-zinc-600"}`} />
              {connected ? "live" : "offline"}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5 sm:py-8">
        <section className="mb-5">
          <p className="text-lg font-medium sm:text-xl">
            {data.summary.waiting > 0 ? (
              <>
                <span className="text-amber-300">{data.summary.waiting}</span> agent
                {data.summary.waiting > 1 ? "s are" : " is"} waiting on you
              </>
            ) : (
              <span className="text-zinc-300">No one is waiting on you 🎉</span>
            )}
          </p>
          <p className="text-sm text-zinc-500">
            {data.summary.working} working · {data.summary.total} sessions tracked
          </p>
        </section>

        <nav className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
                filter === key ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {label}
              {key === "waiting" && data.summary.waiting > 0 && (
                <span className="ml-1.5 rounded-full bg-amber-500/20 px-1.5 text-[11px] text-amber-300">
                  {data.summary.waiting}
                </span>
              )}
            </button>
          ))}
        </nav>

        {waiting.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-400">Needs you</h2>
            <ul className="space-y-2">
              {waiting.map((item) => (
                <ItemRow key={item.id} item={item} highlight />
              ))}
            </ul>
          </section>
        )}

        <section>
          {waiting.length > 0 && rest.length > 0 && (
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Everything else</h2>
          )}
          {visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center">
              <p className="text-2xl">📭</p>
              <p className="mt-2 text-sm text-zinc-400">Nothing here</p>
              <p className="mt-1 text-xs text-zinc-600">
                {filter === "all"
                  ? "Start a Claude Code / Codex / Gemini session, or configure a cloud API key."
                  : "No sessions match this filter."}
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {rest.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </ul>
          )}
        </section>

        <footer className="mt-10 text-center text-[11px] text-zinc-600">
          local-first · data never leaves this machine ·{" "}
          <a className="underline hover:text-zinc-400" href="https://github.com/wookat/attnbox" target="_blank" rel="noreferrer">
            github.com/wookat/attnbox
          </a>
        </footer>
      </main>
    </div>
  );
}

function ItemRow({ item, highlight = false }: { item: AttentionItem; highlight?: boolean }) {
  const style = STATUS_STYLE[item.status];
  const agentStyle = AGENT_STYLE[item.agent] ?? "bg-zinc-500/15 text-zinc-300 border-zinc-500/20";
  const body = (
    <div
      className={`flex items-start gap-3 rounded-xl border p-3 transition-colors sm:p-4 ${
        highlight ? "border-amber-900/60 bg-amber-950/20" : "border-zinc-800 bg-zinc-900/40"
      } ${item.url ? "hover:border-zinc-600 active:bg-zinc-900" : ""}`}
    >
      <span className={`mt-1.5 size-2 shrink-0 rounded-full ${style.dot}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.title}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
          <span className={style.label}>{item.attention ? ATTENTION_LABEL[item.attention] : item.status}</span>
          <span className={`rounded-full border px-2 py-0.5 ${agentStyle}`}>{item.agent}</span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5">{item.location}</span>
          {item.confidence === "heuristic" && (
            <span title="status inferred from local logs, not reported by the agent">~heuristic</span>
          )}
          {item.lastActivityAt && <span>{timeAgo(item.lastActivityAt)}</span>}
        </p>
        {item.project && <p className="mt-1 truncate text-[11px] text-zinc-600">{item.project}</p>}
      </div>
      {item.url && <span className="mt-1 text-zinc-600">↗</span>}
    </div>
  );
  return (
    <li>
      {item.url ? (
        <a href={item.url} target="_blank" rel="noreferrer">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}
