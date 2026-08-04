import { useEffect, useState } from "react";
import type { AttentionItem, InboxSummary } from "@attnbox/core";

interface Payload {
  items: AttentionItem[];
  summary: InboxSummary;
}

const STATUS_STYLE: Record<AttentionItem["status"], { dot: string; label: string }> = {
  waiting: { dot: "bg-amber-400 animate-pulse", label: "text-amber-300" },
  working: { dot: "bg-emerald-400", label: "text-emerald-300" },
  idle: { dot: "bg-zinc-500", label: "text-zinc-400" },
  done: { dot: "bg-sky-500", label: "text-sky-400" },
  unknown: { dot: "bg-zinc-700", label: "text-zinc-500" }
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

export default function App() {
  const [data, setData] = useState<Payload>({ items: [], summary: { total: 0, waiting: 0, working: 0 } });
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const source = new EventSource("/api/events");
    source.onopen = () => setConnected(true);
    source.onerror = () => setConnected(false);
    source.onmessage = (e) => setData(JSON.parse(e.data as string) as Payload);
    return () => source.close();
  }, []);

  const waiting = data.items.filter((i) => i.status === "waiting");
  const rest = data.items.filter((i) => i.status !== "waiting");

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">attnbox</h1>
          <p className="text-sm text-zinc-400">
            {data.summary.waiting > 0
              ? `${data.summary.waiting} agent${data.summary.waiting > 1 ? "s" : ""} waiting on you`
              : "No one is waiting on you"}
            {" · "}
            {data.summary.working} working · {data.summary.total} sessions
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
            connected ? "border-emerald-800 text-emerald-300" : "border-zinc-700 text-zinc-500"
          }`}
        >
          <span className={`size-1.5 rounded-full ${connected ? "bg-emerald-400" : "bg-zinc-600"}`} />
          {connected ? "live" : "offline"}
        </span>
      </header>

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
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Everything else</h2>
        {rest.length === 0 ? (
          <p className="rounded-lg border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-500">
            No other agent sessions found.
          </p>
        ) : (
          <ul className="space-y-2">
            {rest.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ItemRow({ item, highlight = false }: { item: AttentionItem; highlight?: boolean }) {
  const style = STATUS_STYLE[item.status];
  const body = (
    <div
      className={`flex items-start gap-3 rounded-xl border p-3 transition-colors sm:p-4 ${
        highlight ? "border-amber-900/60 bg-amber-950/20" : "border-zinc-800 bg-zinc-900/40"
      } ${item.url ? "hover:border-zinc-600" : ""}`}
    >
      <span className={`mt-1.5 size-2 shrink-0 rounded-full ${style.dot}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.title}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-zinc-500">
          <span className={style.label}>
            {item.attention ? ATTENTION_LABEL[item.attention] : item.status}
          </span>
          <span>{item.agent}</span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5">{item.location}</span>
          {item.confidence === "heuristic" && <span title="status inferred from logs">~heuristic</span>}
          {item.lastActivityAt && <span>{timeAgo(item.lastActivityAt)}</span>}
        </p>
      </div>
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
